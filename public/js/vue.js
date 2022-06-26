var app = new Vue({
    el: '#app',
    data: {
        information:[],
        message: ''
    },
    methods: {
        getData(){
            let url = '/api/datap';
            axios.get(url).then(response => {
                console.log(response.data)
                this.information = response.data;
            });
        }
    },
    mounted(){
        this.getData();
    }

  })