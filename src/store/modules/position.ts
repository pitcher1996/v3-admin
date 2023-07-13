import { defineStore } from 'pinia'
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const usePosition = defineStore('main', {
  state: () => {
    return {
      czml: [
        {
          id: "document",
          name: "wangli",
          version: "1.0",
        },
      ],
      czml2:[
        {
          id: "document",
          name: "build",
          version: "1.0",
        },
      ],
      sumitData:{}, // 区域信息
      buildData:{}, // 楼栋信息
    }
  },
  actions: {
    change(posion: any) {
      // this.position.lng = posion.jd // 横坐标
      // this.position.lat = posion.wd // 横坐标
      (this.czml as any[]).push({
        id: "xixi",
        name: posion.region,
        description: `<div>
          <h3>小区名称</h3>
          <span>西溪北苑是。。。</span>
          <p>72017599</p>
          <p>安装位置：501楼大厅</p>
          <p>--------</p>
          <p>日用水量：56.520m²</p>
          <p style="color:red">主要报警：小表8507</p>
          </div>`,
        billboard: {
          image: "../../../../public/bj.png",
          verticalOrigin: "BOTTOM",
          show: "true",
          scale: 0.2
        },
        position: {
          cartographicDegrees: [posion.jd, posion.wd,100]
        }
      })
    },
    saveForm(form:any){
      this.sumitData = form
    },
    buildMessage(posion: any){
      (this.czml2 as any[]).push({
        id: posion.buildingnumber,
        name: posion.floors,
        description: `<div>
          <h3>楼栋名称</h3>
          <span>这个楼是。。。</span>
          <p>72017599</p>
          <p>安装位置：501楼大厅</p>
          <p>--------</p>
          <p>日用水量：56.520m²</p>
          <p style="color:red">主要报警：小表8507</p>
          </div>`,
        billboard: {
          image: "../../../../public/build4.png",
          verticalOrigin: "BOTTOM",
          show: "true",
        },
        position: {
          cartographicDegrees: [posion.jd, posion.wd,100]
        }
      })
    },
    saveBuild(form:any){
      this.buildData = form
    }
  },
})
