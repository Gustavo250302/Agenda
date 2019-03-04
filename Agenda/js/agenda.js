var agenda = (str, pYear = null, pMonth = null) => {
    var cont;
    var cont1;
    var start_month;

    var dNow = new Date();
    var monthNow = dNow.getMonth();
    var yearNow = dNow.getFullYear();
    var dayNow = dNow.getDate();

    var d = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    var m = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    var month = ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    var lDayMonth = [];
    var fDayMonth = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    lDayMonth[0]  = 31;

    (d.getFullYear() % 4 === 0) ? lDayMonth[1]  = 29 : lDayMonth[1]  = 28;

    lDayMonth[2]  = 31;
    lDayMonth[3]  = 30;
    lDayMonth[4]  = 31;
    lDayMonth[5]  = 30;
    lDayMonth[6]  = 31;
    lDayMonth[7]  = 31;
    lDayMonth[8]  = 30;
    lDayMonth[9]  = 31;
    lDayMonth[10] = 30;
    lDayMonth[11] = 31;

    m.setDate(1);

    for(i=0;i<=6;i++) (m.toString().slice(0,3) === fDayMonth[i]) ? start_month = i : null;

    var aux = 0;
    var day = 0;
    var agenda = "";

    var nextDate = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    nextDate.setMonth(nextDate.getMonth() +1);
    var nextMonth = nextDate.getMonth()+1;
    var nextYear = nextDate.getFullYear();

    var beforeDate = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    beforeDate.setMonth(beforeDate.getMonth() -1);
    var beforeMonth = beforeDate.getMonth()+1;
    var beforeYear = beforeDate.getFullYear();


    var now;
    if (yearNow === d.getFullYear() && monthNow === d.getMonth()){
        now = true;
    }


    var listYears = "";
    for (i=1;i<=100;i++){
        let yearLast = d.getFullYear() +50;
        let year = yearLast -i;
        let currentYear = (d.getFullYear() === year) ? `class="active"`: '';
        listYears += `<li ${currentYear} onclick="agenda('${str}', ${year}, ${d.getMonth() + 1})">${year}</li>`;
    }

    var listMonths = "";
    for (i=0;i<month.length;i++){
        let months = month[i];
        let numberMonth = i+1;
        let currentMonth = (d.getMonth()+1 === numberMonth ? `class="active"`: '');
        listMonths += `<li ${currentMonth} onclick="agenda('${str}', ${d.getFullYear()}, ${numberMonth})">${months}</li>`;
    }

    agenda += `
        <table class="agenda">
            <tr>
                <td colspan='1' onclick="agenda('${str}', ${beforeYear}, ${beforeMonth})">&leftarrow;</td>
                <td colspan='2'>
                    <ul class="select" onclick="$(this).find('ul').css('display', 'block')" onmouseleave="$(this).find('ul').css('display', 'none')">
                        <li data-value="${d.getMonth() + 1}">${month[d.getMonth()]}</li>
                        <ul>
                            ${listMonths}
                        </ul>
                    </ul>
                </td>
                <td colspan='1' onclick="agenda('${str}')">&bull;</td>
                <td colspan='2'>
                    <ul class="select" onclick="$(this).find('ul').css('display', 'block')" onmouseleave="$(this).find('ul').css('display', 'none')">
                        <li data-value="${d.getFullYear()}">${d.getFullYear()}</li>
                        <ul>
                            ${listYears}
                        </ul>
                    </ul>
                </td>
                <td colspan='1' onclick="agenda('${str}', ${nextYear}, ${nextMonth})">&rightarrow;</td>
            </tr>
            <tr><td>Dom</td><td>Seg</td><td>Ter</td><td>Qua</td><td>Qui</td><td>Sex</td><td>S&aacute;b</td></tr>`;

    for(cont=1;cont<=6;cont++) {
        agenda += "<tr>";
        for(cont1=1;cont1<=7;cont1++) {
            if((aux >= start_month) && (day < lDayMonth[d.getMonth()])) {
                day += 1;

                if((day === d.getDate()) && (now === true))
                    agenda += `<td class="date dateNow" data-day="${day}" data-month="${d.getMonth()+1}" data-year="${d.getFullYear()}">${day}</td>`;
                else if(day < d.getDate())
                    agenda += `<td class="date beforeDay" data-day="${day}" data-month="${d.getMonth()+1}" data-year="${d.getFullYear()}">${day}</td>`;
                else
                    agenda += `<td class="date afterDay" data-day="${day}" data-month="${d.getMonth()+1}" data-year="${d.getFullYear()}">${day}</td>`;
            } else {
                agenda += `<td class="otherMonth">&nbsp;</td>`;
            }

            aux += 1;
        }
        agenda += "</tr>";
    }
    agenda += "</table>";
    $(str).html(agenda);
};