// Gestion du menu mobile
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Amélioration de la prévisualisation de l'image
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const previewContainer = document.getElementById('imagePreview');
        previewContainer.innerHTML = '<img src="' + e.target.result + '" alt="Image Preview" style="max-width: 100%; max-height: 200px; border-radius: 10px;">';
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
});

// Tableau des citations pour la Journée de la Femme
const citations = [
    "Aux femmes fortes et inspirantes, aux femmes qui constituent un modèle pour la société, bonne journée de la femme !",
    "Tu rends chaque jour meilleur simplement en y participant. Joyeuse journée de la femme à la femme la plus incroyable du monde !",
    "Chaque femme est une histoire de courage, de rêves et de résilience. Je célèbre toutes ces histoires aujourd'hui et chaque jour !",
    "Comme des étoiles dans le ciel, les femmes illuminent le monde par leur éclat. Que cette Journée de la Femme soit un rappel de la lumière que vous apportez.",
    "À toi, une femme forte et inspirante, je te souhaite une magnifique Journée de la Femme. Continue de briller et d'inspirer ceux qui t'entourent !",
    "Derrière chaque femme exceptionnelle se cache une volonté inébranlable et un courage sans limites. Bonne journée de la femme !",
    "Ta force tranquille et ton élégance naturelle font de toi une source d'inspiration. Joyeuse journée internationale des femmes !",
    "Célébrons l'intelligence, la grâce et la détermination qui font de chaque femme un être extraordinaire. Bonne journée à toi !",
    "Les femmes ne demandent pas le pouvoir pour dominer, mais pour transformer. Merci d'être cette force de changement positif !"
];

// Fonction pour générer une citation aléatoire
function getRandomCitation() {
    const index = Math.floor(Math.random() * citations.length);
    return citations[index];
}

// Fonction pour générer l'image avec le texte
function generateImage() {
    const fileInput = document.getElementById('fileInput');
    const nameInput = document.getElementById('nameInput').value;
    const fontFamily = "Montserrat, sans-serif";
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Veuillez sélectionner une image');
        return;
    }
    
    if (!nameInput) {
        alert('Veuillez entrer votre nom');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = '';
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            const canvasSize = 700;
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            
            // Fond dégradé
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#360820"); 
            gradient.addColorStop(1, "#210514");  
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Ajouter un motif décoratif 
            context.save();
            context.globalAlpha = 0.05;
            for (let i = 0; i < canvas.width; i += 40) {
                for (let j = 0; j < canvas.height; j += 40) {
                    context.beginPath();
                    context.arc(i, j, 5, 0, Math.PI * 2);
                    context.fillStyle = "#FFFFFF";
                    context.fill();
                }
            }
            context.restore();
            
            // Badge décoratif en haut 
            context.beginPath();
            context.moveTo(canvas.width / 2 - 150, 20); 
            context.lineTo(canvas.width / 2 + 150, 20);
            context.lineTo(canvas.width / 2 + 170, 40);
            context.lineTo(canvas.width / 2 - 170, 40);
            context.closePath();
            context.fillStyle = "#E9C46A";
            context.fill();
            
            // Texte du badge 
            context.font = 'bold 12px ' + fontFamily; 
            context.fillStyle = '#360820';
            context.textAlign = 'center';
            context.fillText("JOURNÉE INTERNATIONALE DES FEMMES", canvas.width / 2, 34);
            
            // Masque circulaire pour la photo 
            const imgSize = 230; 
            const imgX = (canvas.width - imgSize) / 2;
            const imgY = 70; // Déplacé plus haut
            
            // Bordure externe 
            context.beginPath();
            context.arc(canvas.width / 2, imgY + imgSize / 2, imgSize / 2 + 10, 0, Math.PI * 2); 
            context.fillStyle = "#E9C46A";
            context.fill();
            
            // Bordure interne
            context.beginPath();
            context.arc(canvas.width / 2, imgY + imgSize / 2, imgSize / 2 + 5, 0, Math.PI * 2); 
            context.fillStyle = "#360820";
            context.fill();
            
            // Dessiner l'image
            context.save();
            context.beginPath();
            context.arc(canvas.width / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
            context.closePath();
            context.clip();
            
            // Optimiser l'affichage de l'image
            const aspectRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;
            
            if (aspectRatio > 1) {
                drawHeight = imgSize;
                drawWidth = drawHeight * aspectRatio;
                offsetX = (drawWidth - imgSize) / -2;
                offsetY = 0;
            } else {
                drawWidth = imgSize;
                drawHeight = drawWidth / aspectRatio;
                offsetX = 0;
                offsetY = (drawHeight - imgSize) / -2;
            }
            
            context.drawImage(img, imgX + offsetX, imgY + offsetY, drawWidth, drawHeight);
            context.restore();
            
             // Ajouter un ruban décoratif
             context.beginPath();
             context.moveTo(canvas.width / 2 - 150, imgY + imgSize + 20);
             context.lineTo(canvas.width / 2 + 150, imgY + imgSize + 20);
             context.lineTo(canvas.width / 2 + 170, imgY + imgSize + 40);
             context.lineTo(canvas.width / 2 - 170, imgY + imgSize + 40);
             context.closePath();
             context.fillStyle = "#E9C46A";
             context.fill();
            
            // Texte du nom 
            context.shadowColor = "rgba(0, 0, 0, 0.7)";
            context.shadowBlur = 5; 
            context.shadowOffsetY = 2; 
            context.font = 'bold 32px ' + fontFamily; 
            context.fillStyle = '#FFFFFF';
            context.textAlign = 'center';
            context.fillText(nameInput, canvas.width / 2, imgY + imgSize + 40);
            context.shadowBlur = 0;
            context.shadowOffsetY = 0;
            
            // Créer un fond semi-transparent pour la citation 
            const citationY = imgY + imgSize + 120; // Déplacé plus haut
            context.fillStyle = "rgba(0, 0, 0, 0.3)";
            context.fillRect(50, citationY - 25, canvas.width - 100, 140); 
            context.strokeStyle = "#E9C46A";
            context.lineWidth = 1.5; 
            context.strokeRect(50, citationY - 25, canvas.width - 100, 140);
            
            // Citation avec meilleure lisibilité 
            const citation = getRandomCitation();
            context.font = 'italic 18px Georgia, serif';
            context.fillStyle = 'white';
            
            // Fonction pour dessiner du texte avec retour à la ligne
            function wrapText(context, text, x, y, maxWidth, lineHeight) {
                const words = text.split(' ');
                let line = '';
                let testLine = '';
                let lines = [];
                
                for (let n = 0; n < words.length; n++) {
                    testLine += words[n] + ' ';
                    const metrics = context.measureText(testLine);
                    const testWidth = metrics.width;
                    
                    if (testWidth > maxWidth && n > 0) {
                        lines.push(line);
                        line = words[n] + ' ';
                        testLine = words[n] + ' ';
                    } else {
                        line = testLine;
                    }
                }
                
                lines.push(line);
                
                // Centrer verticalement le texte
                const totalTextHeight = lines.length * lineHeight;
                let currentY = y - totalTextHeight / 2 + lineHeight / 2;
                
                for (let i = 0; i < lines.length; i++) {
                    context.fillText(lines[i], x, currentY);
                    currentY += lineHeight;
                }
                
                return currentY;
            }
            
            // Dessiner la citation avec retour à la ligne
            context.textAlign = 'center';
            wrapText(context, `"${citation}"`, canvas.width / 2, citationY + 45, canvas.width - 150, 28); // Réduit l'espacement entre les lignes
            
            // Ajouter un badge en bas 
            const badgeY = imgY + imgSize + 300; 
            
            // Créer un cercle avec effet 3D 
            const grd = context.createRadialGradient(
                canvas.width / 2, badgeY, 8,
                canvas.width / 2, badgeY, 40
            );
            grd.addColorStop(0, "#F0D78C");
            grd.addColorStop(1, "#E9C46A");
            
            context.beginPath();
            context.arc(canvas.width / 2, badgeY, 40, 0, Math.PI * 2); 
            context.fillStyle = grd;
            context.fill();
            
            // Ajouter une bordure au cercle
            context.beginPath();
            context.arc(canvas.width / 2, badgeY, 40, 0, Math.PI * 2);
            context.lineWidth = 2; 
            context.strokeStyle = '#FFFFFF';
            context.stroke();
            
            // Texte dans le badge 
            context.font = 'bold 14px ' + fontFamily; 
            context.fillStyle = '#360820';
            context.textAlign = 'center';
            context.fillText("8", canvas.width / 2, badgeY - 5);
            context.fillText("MARS", canvas.width / 2, badgeY + 15);
            
            // Ajouter une signature ou un watermark discret 
            context.font = '9px ' + fontFamily; 
            context.fillStyle = 'rgba(255, 255, 255, 0.5)';
            context.fillText("E2C-Webmaster SINEMATIALI", canvas.width - 80, canvas.height - 15);
            
            // Affichage et téléchargement
            resultContainer.innerHTML = '<img src="' + canvas.toDataURL('image/png') + '" alt="Carte générée" style="max-width: 100%; height: auto;">';
            const downloadLink = document.getElementById('downloadLink');
            downloadLink.href = canvas.toDataURL('image/png');
            
            // Afficher les boutons
            document.getElementById('Regenerer').style.display = 'block';
            document.querySelector('.regenerer').style.display = 'block';
        };
        
        img.src = e.target.result;
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

document.getElementById('generer').addEventListener('click', function() {
    document.querySelector('.regenerer').style.display = "block";
    generateImage();
});

document.getElementById('Regenerer').addEventListener('click', function() {
    generateImage();
});

// Fonctionnalité pour faciliter la sélection de fichier
document.getElementById('fileButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});