fetch('data.json').then(response => response.json()).then(function(data) {

  //spending in the last 7 days
  const week = data.lastDaysSpend;
  const columns = document.getElementsByClassName("col");
  const maxVal = week.reduce((acc, curr) => curr > acc ? curr : acc);
  const now_date = new Date();

  //highlight today
  columns[now_date.getDay()-1].style.backgroundColor = 
    getComputedStyle(document.documentElement)
    .getPropertyValue('--Cyan');

  //set column height and every day spend values
  for (let i = 0; i < week.length; i++) {
    columns[i].style.height = week[i]/maxVal*100+"%"; 
    columns[i].firstElementChild.textContent = '$'+ Number(week[i]).toFixed(2);
  }

  //read and set balance from json
  document.querySelector(".balance .val").textContent = '$'+ Number(data.balance).toFixed(2);

  //set total this moonth value based at last 7 days spending if now is first week at montH
  let totalThisMonth = week.splice(0, now_date.getDate()).reduce((sum, i) => Number(sum) + Number(i));
  if(now_date.getDate() > 7){
    if (!localStorage.getItem('randValue')) 
      localStorage.setItem('randValue', (20+Math.random()*60)*(now_date.getDate()-7));
    totalThisMonth += Number(localStorage.getItem('randValue'));
  }
  document.querySelector(".month-results .val").textContent = '$'+ totalThisMonth.toFixed(2);

  let relativeLastMonth = totalThisMonth/Number(data["lastMonthSpend"]);
  console.log(typeof totalThisMonth, relativeLastMonth);
  let p = relativeLastMonth > 1 ? '+'+(relativeLastMonth*100-100).toFixed(1) :'-'+(relativeLastMonth*100).toFixed(1);
  document.querySelector(".month-results .right-side .val").textContent = p+'%';
  
});