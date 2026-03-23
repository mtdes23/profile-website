document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.profile-card');
    
    // Chỉ kích hoạt hiệu ứng 3D trên Desktop (các thiết bị có hỗ trợ hover)
    if (window.matchMedia('(hover: hover)').matches) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Tính toán tọa độ chuột so với card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Xác định tâm của card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Xoay nhẹ (max 3 độ) theo tọa độ chuột để tạo cảm giác float 3D
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        // Đặt lại style khi chuột rời đi
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            card.style.transition = `transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)`; // Phục hồi mượt mà
        });
        
        // Tắt transition khi rê chuột trên card để phản hồi tức thì
        card.addEventListener('mouseenter', () => {
            card.style.transition = `transform 0.1s ease-out`;
        });
        
        // --- Hiệu ứng Magnetic (Hút theo chuột) cho các Social Icons ---
        const magneticIcons = document.querySelectorAll('.social-icons a');
        magneticIcons.forEach(icon => {
            icon.addEventListener('mousemove', (e) => {
                const rect = icon.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Di chuyển tự do theo chuột với hệ số 0.35
                icon.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.15)`;
                icon.style.transition = 'transform 0.1s ease-out';
            });
            
            icon.addEventListener('mouseleave', () => {
                // Phục hồi lại vị trí gốc bằng lò xo (spring) mượt
                icon.style.transform = `translate(0px, 0px) scale(1)`;
                icon.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
            });
        });
    }
});
