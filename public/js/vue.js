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
        },
        newFact(){
            console.log('new fact');

            Swal.mixin({
                
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                progressSteps: ['1', '2', '3']
            }).queue([
                {
                    title: 'Type your full name',
                    text: 'Full Name',
                    input: 'text',
                    inputValidator: (value) => {
                        if (!value){
                            toastr.error('You need to write something!', 'Error');
                            return ' '
                        }
                    }
                },
                {
                    title: 'Select the position',
                    text: 'soporte, auditor...',
                    input: 'select',
                    inputOptions: {
                        Auditor: 'Auditor',
                        Supoprt: 'Support',
                        Segurity: 'Security'
                    },
                    inputPlaceholder: 'Select a position',
                    inputValidator: (value) => {
                        if (!value){
                            toastr.error('You need to select a position!', 'Error');
                            return ' '
                        }
                    }
                },
                {
                    title: 'Type the salary',
                    text: 'this field accepts decimals',
                    input: 'number',
                    inputAttributes: {
                        min: 4,
                        step: 0.01
                      },
                    inputValidator: (value) => {
                        if (!value){
                            toastr.error('You need to write a salary!', 'Error');
                            return ' '
                        }
                    }
                },
            ]).then( async (result) => {
                if (result.value) {

                    information = {
                        name    : result.value[0],
                        position: result.value[1],
                        salary  : result.value[2],
                    }
                    //console.log(information);
                    let url = '/api/datap';
                    await axios.post(url, information).then(response => {
                        console.log(response.data)
                        this.message = response.data;
                    });

                    this.getData();
                    toastr.success(this.message);

                }
            })
        },

        deleteFact(data){
            console.log(data);

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: true
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                html: "You won't be able to revert this! <br><strong>"+ data.name +"</strong> record",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#d33',
                reverseButtons: true
              }).then( async(result) => {
                if (result.isConfirmed) {
                    let url = '/api/datap/'+data.id;
                    await axios.delete(url).then(response => {
                        console.log(response.data)
                        this.message = response.data;
                    });

                    this.getData();
                    toastr.success(this.message);
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                   toastr.error('Your file is safe :)!', 'Error'); 
                }
              })
        }
    },
    mounted(){
        this.getData();
    }

  })