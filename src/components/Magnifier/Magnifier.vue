<script setup lang="ts">
import {getCurrentInstance, ComponentInternalInstance, onMounted} from "vue";

let { props } = getCurrentInstance() as ComponentInternalInstance;

defineProps({
  image:{
    default(){
      return ''
    }
  }
})

onMounted(()=>{
  const mask = document.querySelector('#MagnifierMask') as Element;
  const originalBox = document.querySelector('.magnifier-img-container') as Element;
  const magnifierBox = document.querySelector('.magnifier-img-box') as Element;
  const magnifierImg = document.querySelector('.magnifier-img-box img') as Element;
  listenBox(".original-img-box",{
    mask,originalBox,magnifierBox,magnifierImg
  })
})

const listenBox = (selector: string, elements: {
  magnifierImg: Element;
  magnifierBox: Element;
  originalBox: Element;
  mask: Element
}, event?: string | string[])=>{
  let target = document.querySelector(selector) as Element,defaultEvent = ['mouseover','mousemove','mouseout'];
  !event ? event = defaultEvent : null;
  const listenEvent = (event:string,callback:Function)=>{
    target.addEventListener(event,(e)=>callback(e))
  }

  const checkEvent = (event:string)=>{
    if(defaultEvent.indexOf(event) === -1){
      throw Error('Your event is not a mouse event !')
    }
    return defaultEvent.indexOf(event) !== -1;
  }

  const dealEvent = (event:string)=>{
    if(checkEvent(event)){
      listenEvent(event,(e:any)=>{
        switch (event){
          case 'mouseover':
            mouseoverEvent(elements);
            break;
          case 'mouseout':
            mouseoutEvent(elements);
            break;
          default:
            mousemoveEvent(e,elements);
        }
      })
    }
  }

  if(Array.isArray(event)){
    event.forEach((event)=>{
      dealEvent(event);
    })
  }
  else{
    dealEvent(event);
  }
}

const mouseoverEvent = ({mask,magnifierBox})=>{
  mask.style.display = 'block';
  magnifierBox.style.display = 'block';
}

const mouseoutEvent = ({mask,magnifierBox})=>{
  mask.style.display = 'none';
  magnifierBox.style.display = 'none';
}

const mousemoveEvent = (e:any,{mask,magnifierBox,originalBox})=>{
  let x = e.pageX - originalBox.offsetLeft , y = e.pageY - originalBox.offsetTop;
  let thresholdX = originalBox.clientWidth - mask.clientWidth , thresholdY = originalBox.clientHeight - mask.clientHeight;
  x -= mask.offsetWidth / 2 ;
  y -= mask.offsetHeight / 2;
  x = x < 0 ? 0 : x;
  x = x > thresholdX ? thresholdX : x;
  y = y < 0 ? 0 : y;
  y = y > thresholdY ? thresholdY : y;
  mask.style.left = x + 'px';
  mask.style.top = y + 'px';
  magnifierBox.style.backgroundPosition = `${(x/thresholdX)*100}% ${(y/thresholdY)*100}%`;
}

</script>

<template>
  <div class="magnifier-img-container">
    <div class="original-img-box">
      <img :src="props.image as string" alt="original-img">
      <div id="MagnifierMask"></div>
    </div>
    <div class="magnifier-img-box" :style="{backgroundImage:`url(${props.image})`,backgroundSize:'1000px'}"></div>
  </div>
</template>

<style scoped lang="scss">
$boxWidth: 400px;
$boxHeight: 400px;
.magnifier-img-container{
  position: relative;
  width: $boxWidth;
  height: $boxHeight;

  .original-img-box{
    position: relative;
    width: $boxWidth;
    height: $boxHeight;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .magnifier-img-box{
    position: absolute;
    display: none;
    top: 0;
    left: 100%;
    width: $boxWidth;
    height: $boxHeight;
    background-repeat: no-repeat;
    overflow: hidden;
  }
}
#MagnifierMask{
  display: none;
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: yellow;
  opacity: .1;
}
</style>