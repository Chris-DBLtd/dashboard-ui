const apiURL = window.location.protocol + "//" + window.location.hostname + ":8080";
$(() => {
   const app = new Vue({
        el: "#app",
        data() {
            return {
                coinlist: [],
                news: [],
                ticker: []
            }
        },
        methods: {
            loadSymbol(event) {
                this.getNewsForSymbol(event);
                this.getCalendarForSymbol(event);
            },
            getNewsForSymbol(event) {
                axios.get(apiURL + "/v1/news/" + event.currentTarget.id)
                .then(res => {
                    this.news = res.data.results;
                });
            },
            getCalendarForSymbol(event) {
                $("#calendar").fullCalendar("removeEventSources");
                $("#calendar").fullCalendar("addEventSource", {
                    url: apiURL + "/v1/calendar/" + event.currentTarget.id,
                    color: "white",
                    textColor: "white"
                });
            }
        },
        mounted() {
            // Calendar
            $("#calendar").fullCalendar({
                defaultView: "month",
                header: {
                    left: "prev",
                    center: "title",
                    right: "next"
                },
                eventSources: [{
                    url: apiURL + "/v1/calendar",
                    color: "white",
                    textColor: "white"
                }],
                eventRender: (ev, el) => {
                    var coins = "";
                    ev.coins.forEach((c, i) => {
                        coins += c;
                        if (i != ev.coins.length-1) {
                            coins += ", ";
                        }
                    });
        
                    el.qtip({
                        content: {
                            title: ev.title,
                            text: ev.description+"<br><br>Coins: "+coins
                        },
                        style: {
                            classes: "qtip-tipsy"
                        },
                        position: {
                            my: 'bottom center',
                            at: 'top center'
                        }
                    });
                }
            });
        
            // News
            getNews(this)();

            // Coin list
            axios.get(apiURL + "/v1/coin-list")
            .then(res => {
                this.coinlist = res.data.data;
            });
            
            // Ticker
            getTicker(this)();
            setInterval(getTicker(this), 5000);
        }
    });
});

function getNews(self) {
    return function() {
        axios.get(apiURL + "/v1/news")
        .then(res => {
            self.news = res.data.results;
        });
    }
}

function getTicker(self) {
    return function() {
        axios.get(apiURL + "/v1/ticker")
        .then(res => {
            self.ticker = res.data.data;
        });
    }
}
