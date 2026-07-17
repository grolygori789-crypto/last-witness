LAST WITNESS — FULL REFACTOR

โครงสร้าง:
- index.html
- css/style.css
- js/engine/ แยกระบบกลางตามหน้าที่
- js/chapters/chapter-01/
- js/chapters/chapter-02/
- assets/images/
- assets/audio/
- docs/REGRESSION_CHECKLIST.txt

สิ่งที่เปลี่ยน:
- นำ Base64 ออกจาก HTML, CSS และ JavaScript ทั้งหมด
- แยกรูปและเสียงเป็นไฟล์จริง พร้อม deduplicate ด้วย SHA-256
- แยก JavaScript เป็น engine modules และ chapter modules
- รักษาลำดับ script เดิมและไม่เปลี่ยน logic/เนื้อเรื่อง

การทดสอบบนมือถือ:
1. แตก ZIP
2. อัปโหลดทั้งโครงสร้างขึ้น GitHub โดยห้ามเปลี่ยนชื่อหรือย้ายโฟลเดอร์
3. เปิด GitHub Pages
4. อย่าเปิด index.html ผ่าน content:// จากแอป Files
5. ตรวจตาม docs/REGRESSION_CHECKLIST.txt

นี่คือ Full Structural Refactor ที่เน้นรักษาพฤติกรรมเดิม
การเปลี่ยนเป็น data-driven story engine ควรเริ่มหลังแพ็กเกจนี้ผ่าน regression test จริง
