const layer = document.querySelector('.layer');
const lists = document.querySelector('.lists');
const gonder = document.querySelector('.gonder');
const good = document.getElementById('good');
const bad = document.getElementById('bad');
const deneme = document.querySelector('.deneme')
const radios = document.querySelectorAll('.radiobtn')
const links = [
  "https://www.w3schools.com/python/trypython.asp?filename=demo_default",
  "https://www.w3schools.com/kotlin/trykotlin.php?filename=demo_helloworld",
  "https://www.w3schools.com/js/tryit.asp?filename=tryjs_myfirst",
  "https://www.w3schools.com/java/tryjava.asp?filename=demo_helloworld",
  "https://www.w3schools.com/cpp/trycpp.asp?filename=demo_helloworld",
  "https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default"
]


let i = -1

let totalFrontend = 0
let totalBackend = 0
let totalFullStack = 0
let totalGamer = 0
let totalMobile = 0
let totalZero = 0

nextQuestion(good.checked, bad.checked)

function nextQuestion(a, b) {
  fetch('/api.json')
    .then(x => x.json())
    .then(y => {
      const data = y.data[i];
      const data2 = y.data[i - 1];
      console.log("data ", data)
      console.log("data2 ", data2)



      if (i == 6) {
        showAnket(data);
        radios.forEach(btn => {
          btn.innerHTML = ""
        })

        deneme.innerHTML = ""

      } else {
        console.log('calıstı')

        if (data == undefined) {
          console.log('ee')
          if (good.checked) {
            const data3 = y.data[5];

            totalFrontend = totalFrontend + data3.frontend
            totalBackend = totalBackend + data3.backend
            totalFullStack = totalFullStack + data3.fullstack
            totalGamer = totalGamer + data3.gamer
            totalMobile = totalMobile + data3.mobile
            totalZero =data3.zero

          } else if (bad.checked) {

            totalFrontend -= data2.frontend
            totalBackend -= data2.backend
            totalFullStack -= data2.fullstack
            totalGamer -= data2.gamer
            totalMobile -= data2.mobile
            totalZero += data2.zero
          }

          const inputs = document.querySelectorAll('.inputs');
          console.log(inputs)

          inputs.forEach((i, index) => {
            console.log(index)
            console.log(data2.left.lists[index])
            if (i.checked) {

              switch (i.value) {
                case "frontend":
                  console.log('frontend')
                  totalFrontend = totalFrontend + data2.left.lists[index].frontend
                  break;
                case "backend":
                  totalBackend = totalBackend + data2.left.lists[index].backend
                  break;
                case "fullstack":
                  totalFullStack = totalFullStack + data2.left.lists[index].fullstack
                  break;
                case "gamer":
                  totalGamer = totalGamer + data2.left.lists[index].gamer
                  break;
                case "mobile":
                  totalMobile = totalMobile + data2.left.lists[index].mobile
                  break;
                  case "zero":
                  totalZero = totalZero + data2.left.lists[index].zero
                  break;
                default:
                  console.log('fas');
              }
            }
          })
          showResult();
        } else {

          layer.innerHTML = `
    <div class="col-sm-6 font-monospace">
      <div class="center left-side">
          <p style="padding-top: 35px;font-size:25px" class="h1 lang">
                  ${data.lang}
          </p>
          <p class="h4 head">
            ${data.head}
          </p>
          <p class="desc" style="font-size:12px;">
          ${data.left.description}
  
          </p>
          <ol style="" type="1" class="lists">
            
            ${data.left.lists.map(item => `<li>${item}</li>`).join('')}
  
          </ol>
      
      </div>
  </div>
  
  <div class="col-sm-6 font-monospace">
    <p class="h3 right-head"  style="padding-top: 50px;  ">
      ${data.right.head}
    </p>
   
    <iframe width="560" height="315" style="margin-left: 100px;" src=${data.right.youtubeLink}
      title="YouTube video player" frameborder="0"
      allowfullscreen>
    </iframe>
    
    <p class="h4 center">${data.right.altHead}</p>
    
    <coda class="center" style="list-style-type: none;">
          ${data.right.code.join("<br>")}
      </coda>
      
  
    `
          
          deneme.innerHTML = `
    <h3>Şimdi bir deneme yapalım !</h3>
    <p>Deneme İçin W3schools a gidelim.</p>
    <a class="btn btn-outline-danger" href=${links[i]}
    role="button" target="_blank" style="color: black;">DENEME</a>
    
    `

          if (good.checked) {

            totalFrontend = totalFrontend + data2.frontend
            totalBackend = totalBackend + data2.backend
            totalFullStack = totalFullStack + data2.fullstack
            totalGamer = totalGamer + data2.gamer
            totalMobile = totalMobile + data2.mobile
            totalZero = data2.zero
          } else if (bad.checked) {

            totalFrontend -= data2.frontend
            totalBackend -= data2.backend
            totalFullStack -= data2.fullstack
            totalGamer -= data2.gamer
            totalMobile -= data2.mobile
            totalZero += data2.zero
          }
        }
      }
    });

  i = i + 1;

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;


}

function showAnket(data) {
  layer.innerHTML = `
  <p style="padding-top: 50px;" class="h1">
    ${data.left.description}
  </p>
  <div style="display: inline-block; margin-right: 10px;">

  ${data.left.lists.map(list => `
  <div class="form-check" style="display: block;">
      <input class="form-check-input inputs" type="checkbox" value="${list.name}" id="A">
      <label class="form-check-label" for="flexCheckDefault">
        ${list.item}
      </label>  
  </div>
  
  `).join('')}
  </div>
  `

}



/*
*/
function showResult() {
  switch (true) {
    case totalFrontend > totalBackend && totalFrontend > totalGamer && totalFrontend > totalMobile && totalFrontend > totalFullStack && totalFrontend > totalZero:
      window.location.href = "frontend.html";
      break;
    case totalBackend > totalFrontend && totalBackend > totalGamer && totalBackend > totalMobile && totalBackend > totalFullStack && totalBackend > totalZero:
      window.location.href = "backend.html";
      break;
    case totalGamer > totalFrontend && totalGamer > totalBackend && totalGamer > totalMobile && totalGamer > totalFullStack && totalGamer > totalZero:
      window.location.href = "gamer.html";
      break;
    case totalMobile > totalFrontend && totalMobile > totalBackend && totalMobile > totalGamer && totalMobile > totalFullStack && totalMobile > totalZero:
      window.location.href = "mobile.html";
      break;
    case totalFullStack > totalFrontend && totalFullStack > totalBackend && totalFullStack > totalGamer && totalFullStack > totalMobile && totalFullStack > totalZero:
      window.location.href = "fullstack.html";
      break;
    case totalZero > totalFrontend && totalZero > totalBackend && totalZero > totalGamer && totalZero > totalMobile && totalZero > totalFullStack:
      window.location.href = "zero.html";
      break;
    default:
      console.log("eea");
      break;
  }
}

  
  
  


