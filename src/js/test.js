var tickets = [ "指定席", "自由席", "指定席", "自由席", "指定席" ];
for (var i = 0 ; i < tickets.length; i++) {
    if(tickets[i] == "自由席" ) {
        continue;
    }
    console.log(i + " : " + tickets[i]);
}
console.log('end');