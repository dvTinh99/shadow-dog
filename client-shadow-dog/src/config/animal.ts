export default  [
    {
        id : 1,
        name : 'deer',
        image : '/src/assets/images/bet/deer.png',
        btnType : 'secondary'
    },
    {
        id : 2,
        name : 'deer',
        image : '/src/assets/images/bet/bear.png',
        btnType : 'success'
    },
    {
        id : 3,
        name : 'deer',
        image : '/src/assets/images/bet/hippo.png',
        btnType : 'warning'
    },
    {
        id : 4,
        name : 'deer',
        image : '/src/assets/images/bet/giraffe.png',
        btnType : 'info'
    },
    {
        id : 5,
        name : 'deer',
        image : '/src/assets/images/bet/elephant.png',
        btnType : 'dark'
    },
    {
        id : 6,
        name : 'deer',
        image : '/src/assets/images/bet/zebra.png',
        btnType : 'danger'
    },
]

export type TAnimal = {
    id : number
    name : string
    image : string
    btnType : string
}