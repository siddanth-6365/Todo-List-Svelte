import { writable } from "svelte/store";


let listArr = [{title:"Title",desc:"this is description",id:1}];
let CurrentList = listArr[0].id;

export const listStore = writable(listArr);
export const CurrentListStore = writable(CurrentList);


