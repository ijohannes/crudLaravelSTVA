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

                    // const answers = JSON.stringify(result.value)
                    // Swal.fire({
                    //     title: 'All done!',
                    //     html: `
                    //         Your answers:
                    //         <pre><code>${information}</code></pre>
                    //     `,
                    //     confirmButtonText: 'registration completed'
                    // })
                }
            })
        },

        deleteFact(id){
            console.log(id);

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })
        }
    },
    mounted(){
        this.getData();
    }

  })