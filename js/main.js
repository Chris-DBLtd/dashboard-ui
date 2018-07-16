const apiURL = window.location.protocol + "//" + window.location.hostname + ":8080";
document.addEventListener("DOMContentLoaded", () => {
    const app = new Vue({
        el: "#app",
        data () {
            return {
                coinlist: [],
                news: [],
                ticker: []
            }
        },
        mounted () {
            getNews(this)();
            const newsEl = document.querySelector("#news");
            newsEl.addEventListener("scroll", () => {
                if (newsEl.scrollTop + newsEl.clientHeight >= newsEl.scrollHeight) {
                    getNews(this)();
                }
            });

            axios.get(apiURL + "/v1/coin-list")
            .then(res => {
                this.coinlist = res.data.data;
            });

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