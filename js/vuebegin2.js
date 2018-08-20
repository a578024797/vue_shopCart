//购物车页
var vm = new Vue({
    el: "#app",
    data: {
        title: 'wocaole',
        productList: [],
        checkAll: false,
        totalMoney: 0,
        showFlag: false,
        delItem: '',
    },
    mounted() {
        this.$nextTick(function () {
            this.showList();
        })
    },
    filters: {
        formatMoney: (value) => {
            return "￥" + value.toFixed(2);
        }
    },
    methods: {
        changeQuentity: function (item, way) {
            switch (way) {
                case 1:
                    item.productQuentity++;

                    break;

                default:
                    item.productQuentity--;

                    if (item.productQuentity < 1) {
                        item.productQuentity = 1;
                    }
                    break;
            }
            this.computeTotalMoney();
        },
        showList: function () {
            let _this = this;
            this.$http.get('./data/cart.json').then(
                res => {
                    _this.productList = res.body.result.productList;
                }
            );
        },
        registerChecked: function (item) {
            if (typeof (item.checked) === 'undefined') {
                this.$set(item, 'checked', true)
            } else {
                item.checked = !item.checked;
                if (!item.checked) {
                    this.checkAll = false;
                }
            }
            let flag = 0;
            this.productList.forEach((item, index) => {
                if (item.checked === true) {
                    flag += 1;
                } else {
                    flag = 0;
                }
            });
            if (flag === this.productList.length) {
                this.checkAll = true;
            }
            this.computeTotalMoney();
        },
        registerAll: function (type) {
            this.checkAll = type;
            this.productList.forEach((item, index) => {
                if (typeof (item.checked) === 'undefined') {
                    this.$set(item, 'checked', type)
                } else {
                    item.checked = type;
                }
            });
            this.computeTotalMoney();
        },
        computeTotalMoney: function () {
            this.totalMoney = 0;
            this.productList.forEach((item, index) => {
                if (item.checked === true) {
                    this.totalMoney += item.productQuentity * item.productPrice;
                }
            });
        },
        deleteClick: function (item) {
            this.showFlag = true;
            this.delItem = item;
        },
        deleteConfrim: function () {
            let index = this.productList.indexOf(this.delItem);
            console.log(index);
            if (index !== -1) {
                this.productList.splice(index, 1);
            }
            this.computeTotalMoney();
            this.showFlag = false;
        }

    }
})

Vue.filter('money', (value, type) => {
    return value.toFixed(2) + type;
})

