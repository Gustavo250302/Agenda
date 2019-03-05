var agenda = (str, pYear = null, pMonth = null) => {
    var cont;
    var cont1;
    var start_month;
    var aux = 0;
    var day = 0;
    var agenda = "";

    var dNow = new Date();
    var monthNow = dNow.getMonth();
    var yearNow = dNow.getFullYear();
    var dayNow = dNow.getDate();

    var d = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    var m = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    /*editable->*/var month = ["Janeiro", "Fevereiro", "Mar&ccedil;o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
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

    var nextDate = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    nextDate.setMonth(nextDate.getMonth() +1);
    var nextMonth = nextDate.getMonth()+1;
    var nextYear = nextDate.getFullYear();

    var beforeDate = pMonth == null || pYear == null ? new Date() : new Date(pYear, pMonth-1, dayNow);
    beforeDate.setMonth(beforeDate.getMonth() -1);
    var beforeMonth = beforeDate.getMonth()+1;
    var beforeYear = beforeDate.getFullYear();

    var dateCurrentSystem = new Date();
    var monthCurrentSystem = dateCurrentSystem.getMonth();
    var yearCurrentSystem = dateCurrentSystem.getFullYear();

    var now;
    if (yearNow === d.getFullYear() && monthNow === d.getMonth()){
        now = true;
    }

    var listYears = "";
    for (i=1;i<=100;i++){
        let yearLast = d.getFullYear() +50;
        let year = yearLast -i;
        let currentYear = (d.getFullYear() === year) ? `class="active-agenda"`: '';
        listYears += `<li ${currentYear} onclick="agenda('${str}', ${year}, ${d.getMonth() + 1})">${year}</li>`;
    }

    var listMonths = "";
    for (i=0;i<month.length;i++){
        let months = month[i];
        let numberMonth = i+1;
        let currentMonth = (d.getMonth()+1 === numberMonth ? `class="active-agenda"`: '');
        listMonths += `<li ${currentMonth} onclick="agenda('${str}', ${d.getFullYear()}, ${numberMonth})">${months}</li>`;
    }

    agenda += `
        <table class="agenda-agenda">
            <tr>
                <td colspan='1' onclick="agenda('${str}', ${beforeYear}, ${beforeMonth})">&leftarrow;</td>
                <td colspan='2'>
                    <ul class="select-agenda" onclick="$(this).find('ul').css('display', 'block')" onmouseleave="$(this).find('ul').css('display', 'none')">
                        <li>${month[d.getMonth()]}</li>
                        <ul>
                            ${listMonths}
                        </ul>
                    </ul>
                </td>
                <td colspan='1' onclick="agenda('${str}')">&bull;</td>
                <td colspan='2'>
                    <ul class="select-agenda" onclick="$(this).find('ul').css('display', 'block')" onmouseleave="$(this).find('ul').css('display', 'none')">
                        <li>${d.getFullYear()}</li>
                        <ul>
                            ${listYears}
                        </ul>
                    </ul>
                </td>
                <td colspan='1' onclick="agenda('${str}', ${nextYear}, ${nextMonth})">&rightarrow;</td>
            </tr>
    `;
    /*editable->*/agenda+=`<tr><td>Dom</td><td>Seg</td><td>Ter</td><td>Qua</td><td>Qui</td><td>Sex</td><td>S&aacute;b</td></tr>`;

    for(cont=1;cont<=6;cont++) {
        agenda += "<tr>";
        for(cont1=1;cont1<=7;cont1++) {
            if((aux >= start_month) && (day < lDayMonth[d.getMonth()])) {
                day += 1;

                if((day === d.getDate()) && (now === true))
                    agenda += `<td class="date-agenda dateNow-agenda" data-agenda-week="${cont1}" data-agenda-day="${day}" data-agenda-month="${d.getMonth()+1}" data-agenda-year="${d.getFullYear()}">${day}</td>`;
                else if(d.getFullYear() < yearCurrentSystem || (d.getMonth() < monthCurrentSystem && d.getFullYear() === yearCurrentSystem) || (day < d.getDate() && d.getMonth() === monthCurrentSystem && d.getFullYear() === yearCurrentSystem))
                    agenda += `<td class="date-agenda beforeDay-agenda" data-agenda-week="${cont1}" data-agenda-day="${day}" data-agenda-month="${d.getMonth()+1}" data-agenda-year="${d.getFullYear()}">${day}</td>`;
                else
                    agenda += `<td class="date-agenda afterDay-agenda" data-agenda-week="${cont1}" data-agenda-day="${day}" data-agenda-month="${d.getMonth()+1}" data-agenda-year="${d.getFullYear()}">${day}</td>`;
            } else {
                agenda += `<td class="otherMonth-agenda">&nbsp;</td>`;
            }

            aux += 1;
        }
        agenda += "</tr>";
    }
    agenda += "</table>";
    $(str).html(agenda);
};

$(document).on('keydown', function(e) {
    var arrowRight = 39;
    var arrowLeft = 37;
    var arrowDown = 40;
    var arrowTop = 38;
    var enter = 13;
    var btn = "";
    var btnYear = false;
    if (e.which === arrowLeft){
        btn = $('.agenda-agenda tr:first-child td:nth-child(1)');
    } else if (e.which === arrowRight){
        btn = $('.agenda-agenda tr:first-child td:nth-child(5)');
    } else if (e.which === arrowDown){
        btn = $('.agenda-agenda tr:first-child td:nth-child(4) .select-agenda ul li:nth-child(51)');
        btnYear = true;
    } else if (e.which === arrowTop){
        btn = $('.agenda-agenda tr:first-child td:nth-child(4) .select-agenda ul li:nth-child(49)');
        btnYear = true;
    } else if (e.which === enter){
        btn = $('.agenda-agenda tr:first-child td:nth-child(3)');
    }
    if (btnYear)
        $('.agenda-agenda tr:first-child td:nth-child(4)').css({'font-weight': 'bold', 'color': '#000', 'background-color': '#b2b2b2'});
    else
        btn.css({'font-weight': 'bold', 'color': '#000', 'background-color': '#b2b2b2'});
    setTimeout( function () {
        btn.trigger('click');
    }, 50);
});

$(document).on('keydown', function(e) {
    var arrowDown = 40;
    var arrowTop = 38;
    if (e.which === arrowDown)
        return false;
    else if (e.which === arrowTop)
        return false;
});