<template>
  <div class="format_input">
    <el-input :placeholder="placeholder" @clear="clearFn" @blur="onBlurHandler" @change="onInputHandler" @focus="onFocusHandler" ref="numeric" type="tel" v-model="amount" clearable v-if="!readOnly" />
    <el-input v-else ref="readOnly" :placeholder="placeholder" type="tel" v-model="amount" :disabled="readOnly" />
  </div>

</template>

<script>
import accounting from 'accounting-js'
export default {
  name: 'FormatInput',
  props: {
    type: {
      type: String,
      default: '',
      required: false
    },
    thousands: {
      type: [Number, String],
      default: '',
      required: false
    },
    /**
     * Currency symbol.
     */
    currency: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Maximum value allowed.
     */
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER || 9007199254740991,
      required: false
    },
    /**
     * Minimum value allowed.
     */
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER || -9007199254740991,
      required: false
    },
    /**
     * Enable/Disable minus value.
     */
    minus: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Input placeholder.
     */
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Value when the input is empty
     */
    emptyValue: {
      type: [Number, String],
      default: '',
      required: false
    },
    /**
     * Number of decimals.
     * Decimals symbol are the opposite of separator symbol.
     */
    precision: {
      type: Number,
      default: 0,
      required: false
    },
    /**
     * Thousand separator type.
     * Separator props accept either . or , (default).
     */
    separator: {
      type: String,
      default: ',',
      required: false
    },
    /**
     * Forced thousand separator.
     * Accepts any string.
     */
    thousandSeparator: {
      default: undefined,
      required: false,
      type: String
    },
    /**
     * Forced decimal separator.
     * Accepts any string.
     */
    decimalSeparator: {
      default: undefined,
      required: false,
      type: String
    },
    /**
     * The output type used for v-model.
     * It can either be String or Number (default).
     */
    outputType: {
      required: false,
      type: String,
      default: 'Number'
    },
    /**
     * v-model value.
     */
    value: {
      type: [Number, String],
      default: '',
      required: true
    },
    /**
     * Hide input and show value in text only.
     */
    readOnly: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Class for the span tag when readOnly props is true.
     */
    readOnlyClass: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Position of currency symbol
     * Symbol position props accept either 'suffix' or 'prefix' (default).
     */
    currencySymbolPosition: {
      type: String,
      default: 'prefix',
      required: false
    }
  },
  data: () => ({
    amount: '',
    isFocus: false,
    isDirty: false
  }),
  computed: {
    /**
     * Number type of formatted value.
     * @return {Number}
     */
    amountNumber() {
      return this.unformat(this.amount)
    },
    /**
     * Number type of value props.
     * @return {Number}
     */
    valueNumber() {
      return this.unformat(this.value)
    },
    /**
     * Define decimal separator based on separator props.
     * @return {String} '.' or ','
     */
    decimalSeparatorSymbol() {
      if (typeof this.decimalSeparator !== 'undefined') {
        return this.decimalSeparator
      }
      if (this.separator === ',') return '.'
      return ','
    },
    /**
     * Define thousand separator based on separator props.
     * @return {String} '.' or ','
     */
    thousandSeparatorSymbol() {
      if(this.thousands){
         return ''
      }else{
        if (typeof this.thousandSeparator !== 'undefined') {
          return this.thousandSeparator
        }
        if (this.separator === '.') return '.'
        if (this.separator === 'space') return ' '
        return ','
      }
    },
    /**
     * Define format position for currency symbol and value.
     * @return {String} format
     */
    symbolPosition() {
      if (!this.currency) return '%v'
      return this.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v'
    }
  },
  watch: {
    /**
     * Watch for value change from other input with same v-model.
     * @param {Number} newValue
     */
    valueNumber(newValue) {
      if (this.$refs.numeric !== document.activeElement) {
        if (typeof parseInt(newValue) === 'number' && newValue !== 0) {
          // type===percent特殊处理
          if (this.type === 'percent') {
            this.amount = this.calc(this.valueNumber,100,'multiply')+'%'
          } else {
            this.amount = this.format(this.valueNumber)
          }
        } else {
          this.isFocus
            ? (this.amount = this.format(newValue))
            : (this.amount = this.emptyValue)
        }
      }
    },
    /**
     * When readOnly is true, replace the span tag class.
     * @param {Boolean} newValue
     * @param {Boolean} oldValue
     */
    readOnly(newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        //this.$nextTick(() => {
          this.$refs.readOnly.className = this.readOnlyClass
        //})
      }
    },
    /**
     * Immediately reflect separator changes
     */
    separator() {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    },
    /**
     * Immediately reflect currency changes
     */
    currency() {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    },
    /**
     * Immediately reflect precision changes
     */
    precision() {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    }
  },
  mounted() {
    // Set default value props when placeholder undefined.
    if (!this.placeholder) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
      // In case of delayed props value.
      setTimeout(() => {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      }, 500)
    }
    // Set read-only span element's class
    if (this.readOnly) this.$refs.readOnly.className = this.readOnlyClass
  },
  methods: {
    decNum(a) {
      /*获取小数位数*/
      var r = 0
      a = a.toString()
      if (a.indexOf('.') !== -1) r = a.split('.')[1].length
      return r
    },
    int(a) {
      /*去除小数点并转成数值*/
      return parseInt(a.toString().replace('.', ''))
    },
    calc(a, b, type) {
      //加减乘除
      var r,
        da = this.decNum(a),
        db = this.decNum(b),
        dsum = da + db,
        dmin = Math.min(da, db),
        dmax = Math.max(da, db)
      dsum += dmax - dmin
      dsum = Math.pow(10, dsum)
      dmax = Math.pow(10, dmax)
      a = this.int(a)
      b = this.int(b)
      if (da > db) {
        b *= Math.pow(10, da - db)
      } else {
        a *= Math.pow(10, db - da)
      }
      switch (type) {
        case 'add':
          r = (a + b) / dmax
          break
        case 'subtract':
          r = (a - b) / dmax
          break
        case 'multiply':
          r = a * b / dsum
          break
        case 'divide':
          r = a / b
          break
      }
      return r
    },
    clearFn(e) {
      this.$emit('clear-callback')
      this.onBlurHandler(e)
    },
    /**
     * Handle blur event.
     * @param {Object} e
     */
    onBlurHandler(e) {
      this.isFocus = false
      this.$emit('blur', e)
      if (this.valueNumber && this.valueNumber !== null) {
        // type===percent特殊处理
        if (this.type === 'percent') {
          this.amount = this.calc(this.valueNumber,100,'multiply')+'%'
        } else {
          this.amount = this.format(this.valueNumber)
        }
      } else {
        this.amount = this.emptyValue
      }
    },
    /**
     * Handle focus event.
     * @param {Object}
     */
    onFocusHandler(e) {
      this.isFocus = true
      this.$emit('focus', e)
      if (this.valueNumber === 0) {
        this.amount = null
      } else {
        this.amount = accounting.formatMoney(this.valueNumber, {
          symbol: '',
          format: '%v',
          thousand: '',
          decimal: this.decimalSeparatorSymbol,
          precision: Number(this.precision)
        })
      }
    },
    /**
     * Handle input event.
     */
    onInputHandler() {
      this.isDirty = true
      this.process(this.amountNumber)
    },
    /**
     * Validate value before update the component. ok
     * @param {Number} value
     */
    process(value) {
      if (value >= this.max) this.update(this.max)
      if (value <= this.min) this.update(this.min)
      if (value > this.min && value < this.max) this.update(value)
      if (!this.minus && value < 0) {
        this.min >= 0 ? this.update(this.min) : this.update(0)
      }
    },
    /**
     * Update parent component model value.
     * @param {Number} value
     */
    update(value) {
      if (this.isDirty || this.type === 'percent') {
        if (
          (typeof parseInt(value) === 'number' && value !== 0) ||
          value === ''
        ) {
          const fixedValue = Math.floor(value * 10) / 10
        //   const fixedValue = accounting.toFixed(value, this.precision)
          const output =
            this.outputType.toLowerCase() === 'string'
              ? fixedValue
              : Number(fixedValue)
          // type===percent特殊处理
          if (this.type === 'percent') {
            this.$emit('input', output)
            setTimeout(() => {
              this.amount = this.calc(this.valueNumber,100,'multiply')+'%'
            }, 200)
          } else {
            this.$emit('input', output)
          }
        } else {
          this.$emit('input', value)
        }
      }
    },
    /**
     * Format value using symbol and separator.
     * @param {Number} value
     * @return {String}
     */
    format(value) {
      if (value !== 0) {
        return accounting.formatMoney(value, {
          symbol: this.currency,
          format: this.symbolPosition,
          precision: Number(this.precision),
          decimal: this.decimalSeparatorSymbol,
          thousand: this.thousandSeparatorSymbol
        })
      } else if (!this.isFocus) {
        return this.emptyValue
      }
    },
    /**
     * Remove symbol and separator.
     * @param {Number} value
     * @return {Number}
     */
    unformat(value) {
      const toUnformat =
        typeof value === 'string' && value === '' ? this.emptyValue : value
      return accounting.unformat(toUnformat, this.decimalSeparatorSymbol)
    }
  }
}
</script>
<style scoped>
.format_input>>>.el-input__inner {
  height: 32px;
  line-height: 32px;
}

  .table_input>>>.el-input__inner {
    height: 37px;
    line-height: 35px;
    border-radius: 0px;
    padding-right: 16px;
  }
</style>
