const loadAllData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then (data => showAllData(data.data.tools.slice(0,6)))  
}

const showAllData = (aiUniverses) =>{
    const aiContainer = document.getElementById('universe-info');
    aiContainer.innerHTML = "";
    aiUniverses.forEach((aiUniverse)=>{
    const aiDev = document.createElement('div');
    aiDev.innerHTML = `
        <div class="col h-100">
            <div class="card h-100">
                <img src="${aiUniverse.image}" class="card-img-to rounded-5 px-4 py-4 h-100" alt="...">
                    <div class="card-body">
                      <h3 class="card-title fs-4 mx-2 fw-semibold">Features</h3>
                      <ol>
                      ${aiUniverse.features[0] ? `<li>${aiUniverse.features[0]}</li>` : ''}
                      ${aiUniverse.features[1] ? `<li>${aiUniverse.features[1]}</li>` : ''}
                      ${aiUniverse.features[2] ? `<li>${aiUniverse.features[2]}</li>` : ''}
                      ${aiUniverse.features[3] ? `<li>${aiUniverse.features[3]}</li>` : ''}
                      </ol>

            <hr class="mx-2">
            <h3 class="card-title fs-4 mx-2 fw-bold">${aiUniverse.name}</h3>
            <div class="d-flex justify-content-between align-items-center">
            <p class="mx-2"><i class="fa-regular fa-calendar-plus date"></i>&nbsp ${aiUniverse.published_in}</p>
            
            <button onclick="aiDetails('${aiUniverse.id}')" class="border-0 bg-white" data-bs-toggle="modal" data-bs-target="#aiDetailModal" ><i class="fa-solid fa-circle-arrow-right fs-3 text-danger text-opacity-75"></i></button>

            </div>
            </div>
            </div>
        </div>
    
    `;
    
    aiContainer.appendChild(aiDev);     
    })
}
loadAllData();
const allDataTogether = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then (data => showAllData(data.data.tools))
}

//For load spinner

window.addEventListener('load', function() {
    let spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';
    setTimeout(function() {
      spinner.style.display = 'none';
    }, 500);
  });

const aiDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiDetails(data.data)
}

const displayAiDetails = ai =>{   
    const modalDescription =document.getElementById('ai-description'); 
    modalDescription.innerHTML =`
    <section class="d-flex row mb-5">
    <div class="col-md-6 rounded-5 p-lg-5">
    
    <p>${ai.description}</p>
    <div class="d-flex gap-4 justify-content-between">
    <div class="text-bg-light text-success text-center fw-bold p-lg-3 rounded-2">
      <p class="mb-0">${ai.pricing ? ai.pricing[0].price : 'free of cost'}</p>
      <p class="mb-1">${ai.pricing ? ai.pricing[0].plan : ''}</p>
    </div>

    <div class = "text-bg-light text-center text-warning fw-bold p-lg-3 rounded-2">
        <p class=" mb-0 ">${ai.pricing ? ai.pricing[1].price : 'free of cost'}</p>
        <p class=" mb-1">${ai.pricing ? ai.pricing[1].plan : ''}</p>
    </div>
    <div class = "text-bg-light text-center text-danger fw-bold p-lg-3 rounded-2">
        <p class=" mb-0">${ai.pricing ? ai.pricing[2].price : 'free of cost'}</p>
        <p class=" mb-1">${ai.pricing ? ai.pricing[2].plan : ''}</p>
    </div>
    </div> 
    
    <div class="d-flex justify-content-between mt-3">
    <div>
    <h3>Features</h3>
    <ul>
    ${ai.features["1"].feature_name ? `<li>${ai.features["1"].feature_name}</li>` : ''}
    ${ai.features["2"].feature_name ? `<li>${ai.features["2"].feature_name}</li>` : ''}
    ${ai.features["3"].feature_name ? `<li>${ai.features["3"].feature_name}</li>` : ''}
    </ul>
    </div>
    
    <div>
    <h3>Integrations</h3>
    <ul>
    ${ai.integrations && ai.integrations.length > 0 ? 
        `${ai.integrations[0] ? `<li>${ai.integrations[0]}</li>` : ''}
        ${ai.integrations[1] ? `<li>${ai.integrations[1]}</li>` : ''}
        ${ai.integrations[2] ? `<li>${ai.integrations[2]}</li>` : ''}`
        : '<li>No data found</li>'}
    </ul>
    </div>
    </div>
    </div>
    
    <div class="col-md-6 px-4">
    <div>
    <img class="w-100 p-2 " src="${ai.image_link[0]}" alt="">
    
    <div>
    ${ai.accuracy && ai.accuracy.score ?
        `<p class="bg-danger px-2 py-1 mt-lg-5 me-lg-5 rounded text-white position-absolute top-0 end-0 ">${ai.accuracy.score * 100}% accuracy</p>`
        : ''}      
    </div>
    </div>
    <div>

    <p>${ai.input_output_examples ? ai.input_output_examples[0].input : ''}</p>
    <p>${ai.input_output_examples ? ai.input_output_examples[0].output : 'No! Not Yet! Take a break!!! '}</p>
    
    </div>
    </div>
    </section>

    `
}




