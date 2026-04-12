const gameData =
{
    game: [
        {
            id: 1,
            title: "Investment Game",
            type: "goal-builder",
            goal: {
                item: "Bike",
                cost: 50
            },
            startingMoney: 35,
            startingFun: 7,
            targetFun: 7,
            actions: [
                // money increase
                {
                    text: "Save $5",
                    img: "https://pngimg.com/d/piggy_bank_PNG56.png",
                    saveAmount: 5,
                    funChange: -1,
                    weight: 3
                },
                {
                    text: "Do chores",
                    img: "https://static.vecteezy.com/system/resources/thumbnails/060/539/488/small/student-boy-sitting-at-home-office-desk-doing-school-homework-surfing-internet-on-desktop-computer-vector.jpg",
                    earnAmount: 6,
                    funChange: -2,
                    weight: 2
                },
                {
                    text: "Sell old toy",
                    img: "https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-toy-drive-vector-png-image_7014253.png",
                    earnAmount: 8,
                    funChange: -2,
                    weight: 1
                },

                // money decrease
                {
                    text: "Buy candy",
                    img: "https://cdn-icons-png.flaticon.com/512/9356/9356709.png",
                    spendAmount: 3,
                    funChange: 1,
                    weight: 4
                },
                {
                    text: "Buy ice cream",
                    img: "https://cdn-icons-png.flaticon.com/512/3250/3250484.png",
                    spendAmount: 5,
                    funChange: 2,
                    weight: 3
                },
                {
                    text: "Go to arcade",
                    img: "https://cdn-icons-png.flaticon.com/512/8848/8848930.png",
                    spendAmount: 8,
                    funChange: 4,
                    weight: 2
                },
                {
                    text: "Buy a snack",
                    img: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
                    spendAmount: 2,
                    funChange: 1,
                    weight: 5
                },
                {
                    text: "Watch a movie",
                    img: "https://www.shutterstock.com/image-vector/kids-watching-movie-theater-vector-260nw-2606822691.jpg",
                    spendAmount: 7,
                    funChange: 3,
                    weight: 3
                },
                {
                    text: "Go to theme park",
                    img: "https://img.freepik.com/free-vector/scene-funfair_1308-30721.jpg?semt=ais_hybrid&w=740&q=80",
                    spendAmount: 12,
                    funChange: 5,
                    weight: 1
                },
                {
                    text: "Go bowling",
                    img: "https://img.freepik.com/premium-vector/cartoon-bowling-game-with-red-ball-white-pins_864013-4465.jpg",
                    spendAmount: 9,
                    funChange: 3,
                    weight: 2
                },
                {
                    text: "Buy a comic book",
                    img: "https://www.shutterstock.com/shutterstock/photos/106466321/display_1500/stock-vector-cartoon-boy-reading-a-comic-book-isolated-on-white-106466321.jpg",
                    spendAmount: 6,
                    funChange: 2,
                    weight: 2
                }
            ]
        }
    ]

}

export default gameData;