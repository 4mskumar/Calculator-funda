const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@/latest/currencies";
// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}
const from = document.querySelector("#from select ");
const to = document.querySelector(".to select");
const DD = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateLoad();
});

for(let select of DD){
    for(curCode in cList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
            if(select.name==="from" && curCode === "USD")
            {
                newOption.selected = "selected";
            }
            if(select.name==="to" && curCode === "INR")
            {
                newOption.selected = "selected";
            }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

let updateFlag = (element) => {
    curCode = element.value;
    console.log(curCode);
    let countryC = cList[curCode];
    let newImg = `https://flagsapi.com/${countryC}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImg;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateLoad();
});

const updateLoad = async ()   => {
    let amt = document.querySelector(".input input");
    let amtVal = amt.value;
    if(amtVal === "" || amtVal < 0){
        amt.value="1";
        amtVal = 1
    }
    // console.log(from.value ,to.value);
    const URL = `${url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response  = await fetch(URL);
    let data = await response.json();
    let rate = data[to.value.toLowerCase()];

    let exchange = amtVal * rate;
    msg.innerText = `${amtVal} ${from.value} = ${exchange} ${to.value}`;
};