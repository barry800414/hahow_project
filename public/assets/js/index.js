"use strict";

var heroList = new Vue({
    el: '#hero-list',
    data: {
        heros: null,
        selected_hero: -1
    },
    created: function created() {
        //send request to get hero list, and update hero list interface
        this.$http.get("http://hahow-recruit.herokuapp.com/heroes").then(function (res) {
            return res.json();
        }, function (err) {
            alert("讀取英雄列表發生錯誤:", err);
        }).then(function (data) {
            this.heros = data;
        });
    },
    methods: {
        reset: function reset() {
            this.selected_hero = -1;
        },
        loadHeroByClick: function loadHeroByClick(hero_id) {
            this.loadHero(hero_id);
            router.setRoute("/heros/" + hero_id);
        },
        loadHero: function loadHero(hero_id) {
            this.selected_hero = hero_id;
            heroProfile.loadHeroProfile(hero_id);
        }
    }
});

var heroProfile = new Vue({
    el: "#hero-profile",
    data: {
        hero_id: 0,
        profile: null,
        remain_points: 0
    },
    methods: {
        //reset heroProfile to initial status
        reset: function reset() {
            this.profile = null;
            this.remain_points = 0;
            this.hero_id = 0;
        },
        loadHeroProfile: function loadHeroProfile(hero_id) {
            this.$http.get("http://hahow-recruit.herokuapp.com/heroes/" + hero_id + "/profile").then(function (res) {
                return res.json();
            }, function (err) {
                alert("讀取英雄檔案時發生錯誤:", err);
            }).then(function (data) {
                this.profile = data;
                this.hero_id = hero_id;
            });
        },
        addPoint: function addPoint(type) {
            if (this.remain_points > 0) {
                this.profile[type] = this.profile[type] + 1;
                this.remain_points = this.remain_points - 1;
            }
        },
        minusPoint: function minusPoint(type) {
            if (this.profile[type] > 0) {
                this.profile[type] = this.profile[type] - 1;
                this.remain_points = this.remain_points + 1;
            }
        },
        updateProfile: function updateProfile() {
            if (this.remain_points !== 0) {
                alert("剩餘點數應為0");
            } else {
                this.$http.patch("http://hahow-recruit.herokuapp.com/heroes/" + this.hero_id + "/profile", this.profile).then(function (res) {
                    alert('英雄檔案更新成功');
                }, function (err) {
                    alert('更新失敗:', err);
                });
            }
        }
    }
});

var router = Router({
    "/heros": {
        on: function on() {
            heroList.reset();
            heroProfile.reset();
        }
    },
    "/heros/:hero_id": {
        on: function on(hero_id) {
            heroList.loadHero(hero_id);
        }
    }
}).configure({
    notfound: function notfound() {
        router.setRoute("/heros");
    }
});

// wait the event trigger
router.init(["/"]);