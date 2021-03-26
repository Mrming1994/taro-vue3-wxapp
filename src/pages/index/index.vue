<template>
    <at-form @submit="handleSubmit"
             @reset="handleReset">
      <at-input required
                name="value1"
                title="文本"
                type="text"
                placeholder="单行文本"
                v-model:value="value1" />
      <at-input required
                name="value2"
                title="密码"
                type="password"
                placeholder="请输入密码"
                v-model:value="value2" />
      <view class="component-item__btn-group">
        <view class="component-item__btn-group__btn-item">
          <at-button type="primary"
                     @click="handleSubmit">提交</at-button>
        </view>
        <view class="component-item__btn-group__btn-item">
          <at-button type="primary"
                     form-type="reset"
                     @click="handleReset">重置</at-button>
        </view>
        <view class="component-item__btn-group__btn-item">
          <at-button type="primary"
                     @click="handleRequest">请求</at-button>
        </view>
      </view>
    </at-form>
    <at-toast :text="text"
              :is-opened="opened" />
</template>

<script>
import { AtButton, AtToast, AtForm, AtInput } from "taro-ui-vue3"
import { defineComponent, reactive, toRefs, } from "vue"
import { query } from '@/api/index'
import "@/pages/index/index.scss";

export default defineComponent({
  components: {
    AtButton,
    AtToast,
    AtForm,
    AtInput
  },
  setup() {
    const state = reactive({
      value1: '',
      value2: '',
      opened: false,
      text: '',
      handleSubmit: () => {
        const { value1, value2 } = state
        if (!value1 && !value2) {
          state.opened = true
          state.text = `表单必填项未填写完整`
        } else {
          state.opened = true
          state.text = `提交成功`
          state.value1 = ''
          state.value2 = ''
        }
        state.closeToast()
      },
      closeToast: () => {
        setTimeout(() => {
          state.opened = false
        }, 2000)
      },
      handleReset: () => {
        state.opened = true
        state.text = `表单已被重置`
        state.value1 = ''
        state.value2 = ''
        state.closeToast()
      },
      handleRequest: () => {
        query().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          console.log('结束')
        })
      }
    })
    return {
      ...toRefs(state)
    };
  },
});
</script>