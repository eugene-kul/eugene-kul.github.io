class DateModule{constructor(){this.loading(),this.init()}loading(){this.events=[],this.date=new Date,this.today=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate()),this.selectDate=this.today,this.firstWeekday=1,this.month=this.date.getMonth(),this.year=this.date.getFullYear(),this.monthNumber=this.today.toLocaleDateString("en-US",{month:"2-digit"}),this.dayNumber=this.today.toLocaleDateString("en-US",{day:"2-digit"}),this.monthString=this.date.toLocaleDateString("en-US",{month:"long"}),this.dayString=this.today.toLocaleDateString("en-US",{weekday:"long"}),this.calendarBody=document.querySelector(".calendar-body"),document.addEventListener("click",this.setClickEvents.bind(this)),this.getDataInLocal()}init(){this.month=this.date.getMonth(),this.year=this.date.getFullYear(),this.monthString=this.date.toLocaleDateString("en-US",{month:"long"}),this.getCalendarPage()}getCalendarPage(){this.calendarBody.innerHTML=`\n\t\t\t<div class="calendar-head">\n\t\t\t\t<h4 class="calendar-current-weekday">${this.dayString} ${this.dayNumber}</h4>\n\t\t\t\t<div class="calendar-btn calendar-btn-type-2 js-btn-today">Today</div>\n\t\t\t\t<div class="calendar-month-block">\n\t\t\t\t\t<div class="calendar-month-prev js-month-prev"><svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.884184 9.47933L9.75966 15.5374C10.1695 15.8173 10.5825 15.9655 10.9258 15.9655C11.5895 15.9655 12 15.4345 12 14.5456L12 1.45237C12 0.564497 11.59 0.0344801 10.9279 0.0344801C10.5841 0.0344801 10.1777 0.182782 9.7669 0.463523L0.887289 6.52143C0.316242 6.91166 0 7.43678 0 8.00071C-0.0001297 8.56425 0.31249 9.08924 0.884184 9.47933Z" fill="#6B6B6B"/></svg></div>\n\t\t\t\t\t<h4 class="calendar-month-year">${this.monthString} ${this.year}</h4>\n\t\t\t\t\t<div class="calendar-month-next js-month-next"><svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1158 6.52067L2.24034 0.462624C1.83045 0.182657 1.41746 0.0344849 1.07419 0.0344849C0.410533 0.0344849 0 0.565532 0 1.45444V14.5476C0 15.4355 0.410015 15.9655 1.07212 15.9655C1.41591 15.9655 1.82231 15.8172 2.2331 15.5365L11.1127 9.47857C11.6838 9.08834 12 8.56322 12 7.99929C12.0001 7.43575 11.6875 6.91076 11.1158 6.52067Z" fill="#6B6B6B"/></svg></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="calendar-content"></div>\n\t\t\t<div class="calendar-footer">\n\t\t\t\t<div class="calendar-btn calendar-btn-type-3 js-add-events-page-from-calendar">\n\t\t\t\t\t<span class="calendar-event-add-text">Add event</span>\n\t\t\t\t\t<span class="calendar-event-add-icon">+</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`,this.drawTable()}getEventListPage(t){t.date&&(this.selectDate=t.date);let e=this.selectDate.toLocaleDateString("en-US",{weekday:"long"}),a=this.selectDate.toLocaleDateString("en-US",{day:"2-digit"}),n=this.selectDate.toLocaleDateString("en-US",{month:"long"}),s=this.selectDate.getFullYear(),d=this.getEventList(this.selectDate);d.map((t,e)=>{d[e]=this.getEventElement(t)}),this.calendarBody.innerHTML=`\n\t\t\t<div class="calendar-head">\n\t\t\t\t<div class="calendar-head-back js-back-to-calendar"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 284.935 284.936" xml:space="preserve"><path d="M110.488,142.468L222.694,30.264c1.902-1.903,2.854-4.093,2.854-6.567c0-2.474-0.951-4.664-2.854-6.563L208.417,2.857C206.513,0.955,204.324,0,201.856,0c-2.475,0-4.664,0.955-6.567,2.857L62.24,135.9c-1.903,1.903-2.852,4.093-2.852,6.567c0,2.475,0.949,4.664,2.852,6.567l133.042,133.043c1.906,1.906,4.097,2.857,6.571,2.857c2.471,0,4.66-0.951,6.563-2.857l14.277-14.267c1.902-1.903,2.851-4.094,2.851-6.57c0-2.472-0.948-4.661-2.851-6.564L110.488,142.468z"/></svg></div>\n\t\t\t\t<h4 class="calendar-current-weekday">${e}<br>${a} ${n} ${s}</h4>\n\t\t\t</div>\n\t\t\t<div class="calendar-content">\n\t\t\t\t<div class="calendar-events-list">\n\t\t\t\t\t<div class="calendar-events-title">Upcoming events this day - ${d.length}</div>\n\t\t\t\t\t<ul class="calendar-events-list">\n\t\t\t\t\t\t${d.length>0?d.join(" "):'<li class="calendar-event-list-empty"><span>Event list is empty...</span></li>'}\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="calendar-footer">\n\t\t\t\t<div class="calendar-btn calendar-btn-type-3 js-add-events-page" data-date="${this.selectDate}">\n\t\t\t\t\t<span class="calendar-event-add-text">Add event</span>\n\t\t\t\t\t<span class="calendar-event-add-icon">+</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`}getAddEventPage(t){let e=this.selectDate.toLocaleDateString("en-US",{weekday:"long"}),a=this.selectDate.toLocaleDateString("en-US",{day:"2-digit"}),n=this.selectDate.toLocaleDateString("en-US",{month:"long"}),s=`<h4 class="calendar-current-weekday">${e}<br>${a} ${n} ${this.selectDate.getFullYear()}</h4>`;"calendar"===t.prev&&(s=`\n\t\t\t\t<div class="calendar-head-input-day">\n\t\t\t\t\t<div class="calendar-add-event-input-block calendar-add-event-date">\n\t\t\t\t\t\t<input type="date" name="event-date" placeholder="date" value="${this.year}-${this.monthNumber}-${this.dayNumber}">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t`),this.calendarBody.innerHTML=`\n\t\t\t<div class="calendar-head">\n\t\t\t\t<div class="calendar-head-back ${"calendar"===t.prev?"js-back-to-calendar":"js-back-to-list-events"}"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 284.935 284.936" xml:space="preserve"><path d="M110.488,142.468L222.694,30.264c1.902-1.903,2.854-4.093,2.854-6.567c0-2.474-0.951-4.664-2.854-6.563L208.417,2.857C206.513,0.955,204.324,0,201.856,0c-2.475,0-4.664,0.955-6.567,2.857L62.24,135.9c-1.903,1.903-2.852,4.093-2.852,6.567c0,2.475,0.949,4.664,2.852,6.567l133.042,133.043c1.906,1.906,4.097,2.857,6.571,2.857c2.471,0,4.66-0.951,6.563-2.857l14.277-14.267c1.902-1.903,2.851-4.094,2.851-6.57c0-2.472-0.948-4.661-2.851-6.564L110.488,142.468z"/></svg></div>\n\t\t\t\t${s}\n\t\t\t</div>\n\t\t\t<div class="calendar-content">\n\t\t\t\t<div class="calendar-events-title">${t.eventName?`Update event: ${t.eventName}`:"Add an event to this day"}</div>\n\t\t\t\t<div class="calendar-events-add-body" data-date="${this.selectDate}">\n\t\t\t\t\t<div class="calendar-add-event-input-block calendar-add-event-color">\n\t\t\t\t\t\t${this.getActiveSelectColor(t.eventColor,["#FDAC53","#F5DF4D","#0072B5","#00A170","#926AA6","#CD212A","#ff99ff"])}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="calendar-add-event-input-block calendar-add-event-name">\n\t\t\t\t\t\t<input type="text" name="event-name" autocomplate="off" placeholder="Event name" value="${t.eventName?t.eventName:""}">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="calendar-add-event-input-block calendar-add-event-repeat">\n\t\t\t\t\t\t<select name="event-repeat">\n\t\t\t\t\t\t\t<option value="once" ${"once"===t.eventRepeat?"selected":""}>One-time event</option>\n\t\t\t\t\t\t\t<option value="select days" ${"select days"===t.eventRepeat?"selected":""}>Select days</option>\n\t\t\t\t\t\t\t<option value="weekly" ${"weekly"===t.eventRepeat?"selected":""}>Weekly (every ${e})</option>\n\t\t\t\t\t\t\t<option value="monthly" ${"monthly"===t.eventRepeat?"selected":""}>Monthly (same date)</option>\n\t\t\t\t\t\t\t<option value="yearly" ${"yearly"===t.eventRepeat?"selected":""}>Yerly (every ${n} ${a})</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="calendar-add-event-input-block calendar-add-event-day ${"select days"===t.eventRepeat?"":"hide"}">\n\t\t\t\t\t\t${this.getActiveSelectDay(t.eventRepeatDayValues,["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="calendar-add-event-input-block calendar-add-event-description">\n\t\t\t\t\t\t<textarea name="event-description" rows="5" placeholder="Description">${t.eventDescription?t.eventDescription:""}</textarea>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="calendar-footer">\n\t\t\t\t<div class="calendar-btn calendar-btn-type-3 js-add-event ${t.eventName?"js-update-event":""}">\n\t\t\t\t\t<div class="calendar-event-item-add">\n\t\t\t\t\t\t<span class="calendar-event-add-text">Save event</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t`,this.eventBody=this.calendarBody.querySelector(".calendar-events-add-body"),this.calendarBody.querySelector(".calendar-add-event-repeat select").addEventListener("change",this.eventRepeatHandler.bind(this))}getActiveSelectDay(t,e){let a=[];return e.map(e=>{let n="";t&&t.includes(e)&&(n="calendar-day-checked"),a.push(`<div class="calendar-add-event-day-item ${n}" data-value="${e}">${e}</div>`)}),a.join("")}getActiveSelectColor(t,e){let a=[];return e.map((e,n)=>{let s="";t?t===e&&(s="calendar-color-checked"):0===n&&(s="calendar-color-checked"),a.push(`<div class="calendar-add-event-color-item ${s}" data-value="${e}" style="background-color: ${e};"></div>`)}),a.join("")}getEventElement(t){return`\n\t\t\t<li class="calendar-event-item js-calendar-event-item"\n\t\t\t\tstyle="border-left-color: ${t.eventColor}"\n\t\t\t\tdata-event-date="${t.date}"\n\t\t\t\tdata-event-color="${t.eventColor}"\n\t\t\t\tdata-event-name="${t.eventName}"\n\t\t\t\tdata-event-repeat="${t.eventRepeat}"\n\t\t\t\tdata-event-description="${t.eventDescription}"\n\t\t\t\tdata-event-repeat-day-values="${t.eventRepeatDayValues}"\n\t\t\t>\n\t\t\t\t<div class="calendar-event-body">\n\t\t\t\t\t<span class="calendar-event-name">${t.eventName}</span>\n\t\t\t\t\t${t.eventDescription?`<span class="calendar-event-description">${t.eventDescription}</span>`:""}\n\t\t\t\t</div>\n\t\t\t\t<span class="calendar-event-delete js-delete-event"></span>\n\t\t\t</li>\n\t\t`}getEventList(t){let e=[];for(let a of this.events){let n=new Date(a.date);this.dateStringShort=t.toLocaleDateString("en-US",{weekday:"short"}),"weekly"===a.eventRepeat&&t.getDay()===n.getDay()?n=t:"monthly"===a.eventRepeat&&t.getDate()===n.getDate()?n=t:"yearly"===a.eventRepeat&&t.getDate()===n.getDate()&&t.getMonth()===n.getMonth()?n=t:"select days"===a.eventRepeat&&a.eventRepeatDayValues.split(",").map(e=>{this.dateStringShort===e&&(n=t)}),this.compareDate(t,n)&&e.push(a)}return e}compareDate(t,e){return t.getDate()===e.getDate()&&t.getMonth()===e.getMonth()&&t.getFullYear()===e.getFullYear()}getLastMondayOfMonth(t,e){let a=new Date(t,e,0),n=a.getDate(),s=a.getDay();return s===this.firstWeekday?a:s<this.firstWeekday?new Date(t,e-1,n-(7-this.firstWeekday)):new Date(t,e-1,n-s+this.firstWeekday)}drawTable(){this.dayInTable=this.getLastMondayOfMonth(this.year,this.month),this.calendar=document.querySelector(".calendar-content"),this.calendar.innerHTML='<ul class="calendar-weekdays"></ul>',this.weekdays=document.querySelector(".calendar-weekdays");for(let t=0;t<6;t++)this.calendar.insertAdjacentHTML("beforeend",'<ul class="calendar-week"></ul>');for(let[t,e]of Object.entries(this.calendar.children))if(e.classList.contains("calendar-week"))for(let a=1;a<=7;a++){let a=[],n=[];this.dateStringShort=this.dayInTable.toLocaleDateString("en-US",{weekday:"short"}),t<=1&&this.weekdays.insertAdjacentHTML("beforeend",`<li>${this.dateStringShort}</li>`),n=this.getEventList(this.dayInTable),this.month!==this.dayInTable.getMonth()&&a.push("calendar-disable"),this.compareDate(this.dayInTable,this.today)&&a.push("calendar-active"),n.length>0&&a.push("calendar-date-with-event"),e.insertAdjacentHTML("beforeend",`\n\t\t\t\t\t<li class="calendar-day-cell ${a.join(" ")}" data-date='${this.dayInTable}'>\n\t\t\t\t\t\t<span class="calendar-day-item">${this.dayInTable.getDate()}</span>\n\t\t\t\t\t\t${n.length?`<span class="calendar-event-count">${n.length}</span>`:""}\n\t\t\t\t\t</li>\n\t\t\t\t`),this.dayInTable=new Date(this.dayInTable.getFullYear(),this.dayInTable.getMonth(),this.dayInTable.getDate()+1)}}eventRepeatHandler(t){let e=document.querySelector(".calendar-add-event-day");"select days"===t.target.value?e&&e.classList.remove("hide"):e&&e.classList.add("hide")}setClickEvents(t){const e=(t,e)=>t.closest(e);if(e(t.target,".js-month-prev")&&(this.date=new Date(this.year,this.month-1),this.init()),e(t.target,".js-month-next")&&(this.date=new Date(this.year,this.month+1),this.init()),e(t.target,".js-btn-today")&&(this.date=new Date,this.init()),e(t.target,".calendar-day-cell")&&(this.selectDate=new Date(e(t.target,".calendar-day-cell").dataset.date),this.getEventListPage({})),e(t.target,".js-add-events-page")&&this.getAddEventPage({prev:"event-list"}),e(t.target,".js-add-events-page-from-calendar")&&this.getAddEventPage({prev:"calendar"}),e(t.target,".js-delete-event")){let a=e(t.target,".js-delete-event").closest(".js-calendar-event-item"),n=a.dataset.eventName,s=a.dataset.eventColor,d=a.dataset.eventRepeat,l=a.dataset.eventDescription,i=a.dataset.eventRepeatDayValues;this.removeEvent(this.selectDate,n,d,l,s,i),this.getEventListPage({})}if(e(t.target,".js-calendar-event-item")&&!e(t.target,".js-delete-event")){let a=e(t.target,".js-calendar-event-item");this.prevEventDate=a.dataset.eventDate;let n=this.prevEventName=a.dataset.eventName,s=this.prevEventColor=a.dataset.eventColor,d=this.prevEventRepeat=a.dataset.eventRepeat,l=this.prevEventDescription=a.dataset.eventDescription,i=this.prevEventRepeatDayValues=a.dataset.eventRepeatDayValues;this.getAddEventPage({eventColor:s,eventName:n,eventRepeat:d,eventDescription:l,eventRepeatDayValues:i.split(",")})}if(e(t.target,".js-back-to-list-events")&&this.getEventListPage({}),e(t.target,".js-back-to-calendar")&&this.getCalendarPage(),e(t.target,".calendar-add-event-day-item")){e(t.target,".calendar-add-event-day-item").classList.toggle("calendar-day-checked")}if(e(t.target,".calendar-add-event-color-item")){let a=e(t.target,".calendar-add-event-color-item");if(a.classList.contains("calendar-color-checked"))return!1;let n=this.calendarBody.querySelectorAll(".calendar-add-event-color-item");if(n)for(let t of n)t.classList.remove("calendar-color-checked");a.classList.toggle("calendar-color-checked")}if(e(t.target,".js-add-event")||e(t.target,".js-update-event")){let a=[],n=this.selectDate,s=this.calendarBody.querySelector('input[name="event-date"]'),d=this.eventBody.querySelector('input[name="event-name"]'),l=this.eventBody.querySelector(".calendar-add-event-color-item.calendar-color-checked"),i=this.eventBody.querySelector('select[name="event-repeat"]'),r=this.eventBody.querySelector('textarea[name="event-description"]');for(let t of this.eventBody.querySelectorAll(".calendar-day-checked"))a.push(t.dataset.value);if(s&&(n=new Date(s.value)),d.value||(d.classList.add("calendar-error"),d.addEventListener("input",function(){this.classList.remove("calendar-error")})),!a.length&&"select days"===i.value){let t=this.calendarBody.querySelector(".calendar-add-event-day");t.classList.add("calendar-error"),t.addEventListener("click",function(){this.classList.remove("calendar-error")})}if(!d.value||!a.length&&"select days"===i.value)return!1;e(t.target,".js-update-event")&&this.removeEvent(this.prevEventDate,this.prevEventName,this.prevEventRepeat,this.prevEventDescription,this.prevEventColor,this.prevEventRepeatDayValues),this.setEvents(n.toISOString(),d.value,i.value,r.value,l.dataset.value,a),e(t.target,".js-update-event")?this.getEventListPage({}):this.getCalendarPage()}}setEvents(t,e,a,n,s,d){let l=new Date(t).toLocaleDateString("en-US",{weekday:"short"});d&&(d.map(e=>{if(l!==e){let a=new Date(new Date(t).getFullYear(),new Date(t).getMonth(),new Date(t).getDate()+1);for(let n=0;n<7;n++){(a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1)).toLocaleDateString("en-US",{weekday:"short"})===e&&(t=a)}}}),d=d.join(",")),this.events.push({date:t,eventName:e,eventRepeat:a,eventDescription:n,eventColor:s,eventRepeatDayValues:d}),this.setLocalStorage()}setLocalStorage(){let t=JSON.stringify({events:this.events});localStorage.setItem("_events",t)}getDataInLocal(){let t=localStorage.getItem("_events");t&&(t=JSON.parse(t),this.events=t.events)}removeEvent(t,e,a,n,s,d){this.events.map((t,l)=>{this.compareRemoveEventDate(new Date(t.date),a,d)&&t.eventName===e&&t.eventColor===s&&t.eventRepeat===a&&t.eventDescription===n&&t.eventRepeatDayValues===d&&(this.events.splice(l,1),this.setLocalStorage())})}compareRemoveEventDate(t,e,a){return"once"===e||("weekly"===e&&t.getDay()===this.selectDate.getDay()||("monthly"===e&&t.getDate()===this.selectDate.getDate()||("yearly"===e&&t.getDate()===this.selectDate.getDate()&&t.getMonth()===this.selectDate.getMonth()||"select days"===e&&a.includes(this.selectDate.toLocaleDateString("en-US",{weekday:"short"})))))}}new DateModule;