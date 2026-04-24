// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Header Logic
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            // Provide feedback to the user
            const name = document.getElementById('name').value;
            alert(`감사합니다, ${name}님! 메시지가 전송됩니다.`);
        });
    }

    // Animal Look Test Logic
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const uploadBox = document.getElementById('upload-box');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const labelContainer = document.getElementById('label-container');

    const MODEL_URL = "https://teachablemachine.withgoogle.com/models/Y7TGsT3yn/";
    let model, maxPredictions;

    async function initModel() {
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }

    if (imageUpload) {
        imageUpload.addEventListener('change', async (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    imagePreview.src = event.target.result;
                    imagePreviewContainer.style.display = 'block';
                    uploadBox.style.display = 'none';
                    resultContainer.style.display = 'block';
                    
                    if (!model) {
                        resultMessage.innerText = "모델 로딩 중...";
                        await initModel();
                    }
                    
                    resultMessage.innerText = "분석 중...";
                    await predict();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    async function predict() {
        const prediction = await model.predict(imagePreview);
        labelContainer.innerHTML = '';
        
        // Sort predictions by probability
        prediction.sort((a, b) => b.probability - a.probability);
        
        const topResult = prediction[0];
        let animalType = topResult.className === 'Dog' ? '강아지' : '고양이';
        resultMessage.innerText = `당신은 ${animalType}상입니다!`;

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className === 'Dog' ? '강아지상' : '고양이상';
            const probability = (prediction[i].probability * 100).toFixed(0);
            
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `
                <div class="result-label">
                    <span>${classPrediction}</span>
                    <span>${probability}%</span>
                </div>
                <div class="result-bar">
                    <div class="result-fill" style="width: ${probability}%"></div>
                </div>
            `;
            labelContainer.appendChild(resultItem);
        }
    }

    // Optional: Smooth scroll for navigation links (though already handled by CSS scroll-behavior)
    // This can be used for more fine-grained control if needed.
});
