




# Programing Hero Task 2 Coding Problem Set



const data = [
    {
        name:"Mr Rashed",
        birthYear: 1999,
        currentYear: 2022,
        district: "Dhaka",
        postNo: 1200,
        priority: 2
    },
    {
        name:"Mr Raju",
        birthYear: 1995,
        currentYear: 2022,
        district: "Rajshahi",
        postNo: 1211,
        priority: 1
    },
];

const cardDistribution = (data) => {
    if(typeof(data) === 'object' && data !== null && data.length != 0){
        let output = [];
        for(let i = 0; i < data.length; i++){
            const element = data[i];
            const first = element.district.substring(0,2).toUpperCase(); // 2 
            const second = element.currentYear % 100; // 2
            const third = element.postNo.toString().substring(0,2); // 2
            const fourth = element.birthYear; // 4
            const sixth = i + 1; // 1
            let fifth = '' ; // 5
            for(let j = 0; j < (6 - sixth.toString().length); j++){
                fifth = fifth + '0';
            }
            const  cardNumber = first + second + third + fourth + fifth + sixth;
            const gift = sixth % 2 === 0 ? 'R' : 'W';
            output.push({
                cardNumber : cardNumber,
                gift: gift,
                priority: element.priority
            });
        }
        const sortedOutput = sortByPriority(output)
        return sortedOutput;
    }
    else{
        return "Input not formatted";
    }
}

function sortByPriority(data) {
	return data.sort((a, b) => a.priority - b.priority);
}

console.log(cardDistribution(data));
