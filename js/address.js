//address页
var ad = new Vue({
    el: '#adApp',
    data: {
        sliceNumber: 3,
        isCheck: false,
        wayDistribution:true,
        addressList: [],
    },
    mounted: function () {
        this.$nextTick(() => {
            this.initAddressLit();
        })
    },
    computed: {
        fliterAdList: function () {
            console.log(this.sliceNumber);
            return this.addressList.slice(0, this.sliceNumber);
        }
    },
    methods: {
        initAddressLit: function () {
            axios.get('./data/address.json').then((res) => {
                this.addressList = res.data.result;
                console.log(this.addressList);
            }).catch((err) => {
                console.log(err);
            });
        },
        showMore: function (number) {
            if (this.sliceNumber !== this.addressList.length) {
                this.sliceNumber = this.addressList.length;
            } else {
                this.sliceNumber = number;
            }
        },
        becomeDefault: function (item) {
            this.addressList.forEach((add, index) => {
                if (add.addressId === item.addressId) {
                    add.isDefault = true;
                } else {
                    add.isDefault = false;
                }
            });
        }
    }
})