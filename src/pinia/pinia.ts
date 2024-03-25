import { defineStore } from "pinia";
export const userStore = defineStore('user',{
  state:()=>{
    return {
      isLoading:false
    }
  },
  actions:{
    changeLoadingStatus(status:boolean){
      this.isLoading = status
    }
  }
})
