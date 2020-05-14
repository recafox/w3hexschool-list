function getMilleSecond(time){
  let millisecond;
  let allTime = time.split(' ');
  let found = allTime[2].indexOf('12');

  if (allTime.includes('上午')) {
    let newTime = allTime.join(' ');
    const timeString = newTime.replace("上午", "");
    millisecond = new Date(timeString).getTime();
  }else if(allTime.includes('下午') && found === 0){
    let newTime = allTime.join(' ');
    const timeString = newTime.replace("下午", "");
    millisecond = new Date(timeString).getTime();
  }   
  else if (time.indexOf("下午") > -1 && found !==0) {
    const timeString = time.replace("下午", "");
    millisecond = new Date(timeString).getTime() + 12 * 60 * 60 * 1000;
  }

  return millisecond;
};

function setToStorage(arr){
    localStorage.setItem('likePost', JSON.stringify(arr));
}

function countTotalPages(displayItems, pageSize){
  const vm = this;
  return Math.ceil(displayItems.length / pageSize);
}


export { getMilleSecond,setToStorage, countTotalPages };