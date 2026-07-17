/* Last Witness Full Refactor
 * DOM helpers, registries, localization, clue data and state
 * Master Source lines 3-228
 */

const $=selector=>document.querySelector(selector);
const $$=selector=>Array.from(document.querySelectorAll(selector));
const PORTRAITS={"Benedict":{"neutral":"assets/images/381e0e1f9a98101c.jpg","smile":"assets/images/fe04f1468bad8d82.jpg","thinking":"assets/images/a0fc6623ca50a308.jpg","serious":"assets/images/11088c10c5b3cfe6.jpg","surprised":"assets/images/e0dcf52db888a816.jpg","smirk":"assets/images/57c2b9cd8b54b14f.jpg","somber":"assets/images/c2c68545464bad83.jpg","suspicious":"assets/images/945c34cdf1a35f78.jpg"},"North":{"neutral":"assets/images/c50ad1d603cb4eae.jpg","analyzing":"assets/images/c52000aa1f740adf.jpg","serious":"assets/images/a32595ad37b3c868.jpg","skeptical":"assets/images/6931139ef06e0b99.jpg","dry":"assets/images/520455a5f976f4e5.jpg","smile":"assets/images/e8858b221595c517.jpg","amused":"assets/images/0ab94f0a34fcf4ae.jpg","eyeroll":"assets/images/b36f278224bd62d9.jpg","embarrassed":"assets/images/d60330719de8ba4d.jpg","surprised":"assets/images/13062992ad5ed651.jpg","shocked":"assets/images/a7df9547ddb301c0.jpg","concerned":"assets/images/5a51446056fdcb0a.jpg","determined":"assets/images/083c49be64c0c61b.jpg","angry":"assets/images/666c3e328ce2431d.jpg","tired":"assets/images/c52d592efa6e0e5a.jpg","pensive":"assets/images/1ae925a2f06c17ee.jpg","confident":"assets/images/b9e5ed1a6d0365a9.jpg","playful":"assets/images/5d48df302809b710.jpg","relieved":"assets/images/9a859e7e805b89ee.jpg"}};
const AUDIO={theme:$("#themeAudio"),rain:$("#rainAudio"),click:$("#clickAudio"),page:$("#pageAudio"),office:$("#officeAudio"),crime:$("#crimeAudio"),steps:$("#stepsAudio"),vibrate:$("#vibrateAudio"),chapter:$("#chapterAudio"),morningOffice:$("#morningOfficeAudio"),cafe:$("#cafeAudio"),evidence:$("#evidenceAudio"),police:$("#policeAudio")};
const SAVE={auto:"last_witness_rc1_auto",manual:"last_witness_rc1_manual"};

const LANG={
en:{
tap_begin:"Tap to begin",title_eyebrow:"A Benedict Interactive game",tagline:"The dead don't talk. Evidence does.",
new_game:"New Game",continue_game:"Continue",load_game:"Load Game",location_office:"Detective Office",
location_room:"Grandview Hotel • Room 1807",review_evidence:"Review Evidence",victim_phone:"Victim's Phone",
tap_phone:"Tap the phone",phone_date:"Saturday, June 14",messages:"Messages",three_unread:"3 unread",two_unread:"2 unread",
calls:"Calls",three_missed:"3 missed",notes:"Notes",one_recovered:"1 recovered",back_evidence:"Back to evidence",
case_summary:"Case Summary",room_1807:"ROOM 1807",summary_meta:"Grandview Hotel • Chapter 1",
make_deduction:"Make a Deduction",deduction_room:"Deduction • Room 1807",case_closed:"Case Closed",
chapter_complete:"CHAPTER 1 COMPLETE",investigation_continues:"The investigation continues.",return_title:"Return to Title",
saved:"Saved",game_menu:"Game Menu",resume:"Resume",save_game:"Save Game",overwrite_save:"Overwrite the manual save",
dialogue_history:"Dialogue History",case_file:"Case File",settings:"Settings",restart_chapter:"Restart Chapter",
close:"Close",language:"Language",master_sound:"Master Sound",music:"Music",sfx:"SFX",
auto_saved:"Auto Saved",manual_saved:"Manual Saved",no_save:"No save found.",no_dialogue:"No dialogue yet.",
no_evidence:"No evidence yet.",new_evidence:"New Evidence: ",next_continue:"Continue",next_tap:"Tap to continue",
objective_phone:"Phone",objective_room:"Room",objective_phone_data:"Phone data",
phone_title_messages:"Messages",phone_title_calls:"Recent Calls",phone_title_notes:"Notes",
phone_unknown:"Unknown",phone_warning:"You shouldn't have come here.",phone_where:"Where are you?",
phone_missed:"Missed",phone_meet:"Meet at the pier.",phone_11pm:"11pm.",
clue_phone_title:"Victim's phone",clue_phone_desc:"The phone is intact and still powered.",
clue_blood_title:"Blood pattern",clue_blood_desc:"The body was moved after death. The room was staged.",
clue_laptop_title:"Cleared laptop",clue_laptop_desc:"Recent-file history was deliberately erased.",
clue_suitcase_title:"Half-packed suitcase",clue_suitcase_desc:"The victim intended to leave in a hurry.",
clue_message_title:"Warning message",clue_message_desc:"Unknown: “You shouldn't have come here.”",
clue_calls_title:"Three missed calls",clue_calls_desc:"Three calls from R. arrived shortly before death.",
clue_note_title:"Pier meeting",clue_note_desc:"Recovered note: “Meet at the pier. 11pm.”",
d_office_1:"Benedict.",d_office_2:"That tone usually means someone's ruined our evening.",
d_office_3:"Grandview Hotel. Room 1807. Possible homicide.",d_office_4:"You look nice today, by the way.",
d_office_5:"We're going to a crime scene.",d_office_6:"Timing has never been my strength.",
d_office_7:"Neither has silence.",d_blood_1:"The spread's wrong.",
d_blood_2:"Wrong in a murdery way, or a laundry way?",d_blood_3:"Staged. The body was moved.",
d_laptop_1:"Recent files are empty.",d_laptop_2:"Not empty. Cleared.",
d_laptop_3:"You say that like someone insulted your family.",d_laptop_4:"They insulted file history.",
d_suitcase_1:"Half packed. He was leaving in a hurry.",d_suitcase_2:"I pack like this for normal trips.",
d_suitcase_3:"That explains a lot.",
d_deduce_1:"The blood pattern, the cleared laptop and the packed suitcase don't belong to the same story.",
d_deduce_2:"Because someone assembled the story after he died.",d_deduce_3:"The room was staged.",
d_deduce_4:"And whoever staged it knew we'd find the phone.",d_deduce_5:"Which means the warning wasn't for him.",
d_deduce_6:"It was for us.",d_call_1:"Unknown number.",d_call_2:"Benedict speaking.",d_call_3:"...",
d_call_4:"They hung up.",d_call_5:"What did they say?",d_call_6:"“You looked in the wrong room.”",chapter_i:"CHAPTER I",chapter_1_name:"HOTEL 1807",chapter_ii:"CHAPTER II",chapter_2_name:"THE PERFECT STRANGER",continue_chapter2:"Continue to Chapter II",location_office_v2:"Detective Office • Morning",location_victim_apartment:"Victim's Apartment",choose_response:"Choose a response",choice_warm:"You look like you actually slept.",choice_observant:"You've been here a while.",choice_direct:"What came in?",characters:"Characters",back:"Back",unknown_character:"Unknown",trusted_partner:"Trusted Partner",self_status:"Detective",journal_benedict_notes:"My choices shape the investigation, whether I notice it or not.",journal_north_notes:"We've worked together long enough that she usually notices the part I missed.",character_added:"Character Added: ",chapter2_phase1:"Chapter II • Phase 1",arrival_apartment:"THE APARTMENT",phase1_end_text:"The new investigation begins here.",c2_01:"Morning.",c2_02:"That sounded almost optimistic.",c2_03:"Don't get used to it.",c2_04:"You look like you actually slept.",c2_05:"You've been here a while.",c2_06:"What came in?",c2_07_warm:"I slept. You should try it sometime.",c2_07_observant:"Forty-three minutes. You noticed the second coffee, not the timestamp.",c2_07_direct:"A dead tenant, a clean apartment and a report that arrived before the police requested one.",c2_08:"A new case?",c2_09:"Possibly. The victim is Daniel Voss, thirty-eight. Found dead in his apartment at 06:20.",c2_10:"Cause of death?",c2_11:"Pending. But someone accessed his building at 05:47 using a resident credential that shouldn't exist.",c2_12:"So either the building has a ghost...",c2_13:"...or someone wants us looking for one.",c2_14:"Apartment first.",c2_15:"Already sent the address to your phone.",c2_16:"You do take the romance out of detective work.",c2_17:"That's what the coffee is for.",new_feature:"NEW FEATURE",journal_unlocked:"Character Journal Unlocked",open_menu_to_view:"Open Menu (☰) to view",north_added:"North added to the journal",trust:"Trust",respect:"Respect",affection:"Affection",suspicion:"Suspicion",relationship:"Relationship",review_apartment:"Review the Apartment",inspect_apartment:"Inspect the apartment",evidence_count:"Evidence",evidence_found:"Evidence Found",
continue_investigation:"Continue Investigation",new_location:"New Location",location_cafe:"Orchid Café",orchid_cafe:"ORCHID CAFÉ",
cafe_arrival_text:"Daniel Voss arranged to meet someone here shortly before he died.",
apt_mug_title:"Two Coffee Mugs",apt_mug_desc:"One mug is dry and cold. The other still carries a faint ring of moisture. Daniel was not alone as early as the official timeline suggests.",
apt_mug_obs:"Benedict: Whoever visited him stayed long enough for coffee—and left before the body was reported.",
apt_documents_title:"Duplicated Access Record",apt_documents_desc:"A printed building log lists credential 18-07 twice: once under Daniel Voss and once under an unnamed temporary resident.",
apt_documents_obs:"North: The credential that ‘shouldn’t exist’ was created inside the building’s own system.",
apt_board_title:"Private Investigation Board",apt_board_desc:"Daniel had linked Hotel 1807, three shell companies and a handwritten note reading ‘Ask E. about the corrected time.’",
apt_board_obs:"Benedict: He was investigating something before he became part of it.",
apt_laptop_title:"Unsent Café Draft",apt_laptop_desc:"A recovered draft names Orchid Café and 09:30. The recipient field was erased, but the message reads: ‘Bring the original report. Come alone.’",
apt_laptop_obs:"North: The draft was edited at 05:51—four minutes after the unknown credential entered the building.",
apt_intro_01:"Clean apartment.",apt_intro_02:"Too clean?",apt_intro_03:"Organised. Deliberately. Someone left the things they wanted us to see.",
apt_intro_04:"Then let's look at what they forgot.",
apt_review_01:"Coffee for two. A duplicated credential. Hotel 1807 on his wall.",apt_review_02:"And a meeting at Orchid Café after he was already dead.",
apt_review_03:"Someone expected Daniel to keep that appointment.",apt_review_04:"Or expected us to find it.",
apt_review_05:"Either way, the café is our next stop.",
cafe_scene_label:"First Contact",elena_added_note:"Elena has been added to the Character Journal",
forensic_analyst:"Forensic Analyst",journal_elena_notes:"Calm, precise and unusually prepared. She corrected part of the timeline before we met.",
cafe_choice_friendly:"You came prepared.",cafe_choice_analytical:"You corrected the timeline before we arrived.",cafe_choice_guarded:"How much did Daniel tell you?",
location_police_station:"Metropolitan Police • Investigation Floor",police_station_title:"POLICE STATION",police_arrival_text:"The corrected access log is waiting upstairs.",
cafe_01:"She's already here.",cafe_02:"The witness?",cafe_03:"No. Elena.",
cafe_04:"You must be Benedict.",cafe_05:"That depends. Is this where I deny everything?",
cafe_06:"Only if you ordered the second coffee.",cafe_07:"I didn't. Daniel did.",
cafe_08:"At 09:30. After his estimated time of death.",cafe_09:"That estimate is wrong.",
cafe_10:"You sound certain.",cafe_11:"I checked the thermal loss in the apartment photos. The first report rounded too aggressively.",
cafe_12:"You corrected the timeline before we arrived.",cafe_13:"I corrected a number. The timeline is still yours.",
cafe_friendly_01:"You came prepared.",cafe_friendly_02:"I dislike wasting other people's mornings.",
cafe_analytical_01:"You corrected the timeline before we arrived.",cafe_analytical_02:"Only the part that was measurable.",
cafe_guarded_01:"How much did Daniel tell you?",cafe_guarded_02:"Enough to know he was afraid. Not enough to know of whom.",
cafe_14:"Daniel asked me to verify an original toxicology report.",cafe_15:"Original—as opposed to the corrected one?",
cafe_16:"The corrected copy changes the collection time by eleven minutes.",
cafe_17:"Eleven minutes is very specific.",cafe_18:"Specific errors are usually more useful than vague truths.",
cafe_19:"Where's the original now?",cafe_20:"At the police station. Evidence intake logged it this morning.",
cafe_21:"Before Daniel's body was found?",cafe_22:"Three minutes before.",
cafe_23:"Convenient.",cafe_24:"No. Convenient would be simple.",
cafe_25:"Let's see the log.",cafe_26:"I'll meet you there. I have a lab key they won't lend you.",
cafe_27:"I was hoping charm still opened doors.",cafe_28:"It does. Just rarely the correct ones.",
developer_console:"Developer Console",developer_access:"Developer Access",enter_access_code:"Enter Access Code",
authenticate:"Authenticate",auth_success:"AUTHENTICATION SUCCESSFUL",auth_failed:"Authentication Failed.",
console_unlocked:"DEVELOPER CONSOLE UNLOCKED",developer_internal:"Developer Console · Internal Access",
jump_location:"Jump Location",developer_tools:"Developer Tools",dev_office:"Chapter II · Office",
dev_apartment:"Victim's Apartment",dev_cafe:"Orchid Café",dev_police:"Police Station",
unlock_characters:"Unlock Characters",unlock_evidence:"Unlock Evidence",reset_choice_flags:"Reset Choice Flags",
reset_all_saves:"Reset All Saves",lock_developer_access:"Lock Developer Access",dev_action_complete:"Developer action complete.",evidence_inspection:"Evidence Inspection",case_evidence:"Case Evidence",tap_to_inspect:"Tap evidence to inspect",inspect_evidence:"Inspect",collect_evidence:"Collect Evidence",evidence_collected:"Evidence Collected"
},
th:{
tap_begin:"แตะเพื่อเริ่ม",title_eyebrow:"เกมจาก Benedict Interactive",tagline:"คนตายพูดไม่ได้ แต่หลักฐานพูดแทนได้",
new_game:"เริ่มเกมใหม่",continue_game:"เล่นต่อ",load_game:"โหลดเกม",location_office:"สำนักงานนักสืบ",
location_room:"โรงแรมแกรนด์วิว • ห้อง 1807",review_evidence:"สรุปหลักฐาน",victim_phone:"โทรศัพท์ของผู้ตาย",
tap_phone:"แตะที่โทรศัพท์",phone_date:"วันเสาร์ที่ 14 มิถุนายน",messages:"ข้อความ",three_unread:"ยังไม่อ่าน 3 ข้อความ",two_unread:"ยังไม่อ่าน 2 ข้อความ",
calls:"สายโทร",three_missed:"ไม่ได้รับ 3 สาย",notes:"บันทึก",one_recovered:"กู้คืนแล้ว 1 รายการ",back_evidence:"กลับไปดูหลักฐาน",
case_summary:"สรุปคดี",room_1807:"ห้อง 1807",summary_meta:"โรงแรมแกรนด์วิว • บทที่ 1",
make_deduction:"วิเคราะห์คดี",deduction_room:"ข้อสรุป • ห้อง 1807",case_closed:"ปิดคดี",
chapter_complete:"จบบทที่ 1",investigation_continues:"การสืบสวนยังไม่จบ",return_title:"กลับหน้าแรก",
saved:"บันทึกแล้ว",game_menu:"เมนูเกม",resume:"เล่นต่อ",save_game:"บันทึกเกม",overwrite_save:"เขียนทับช่องบันทึกปัจจุบัน",
dialogue_history:"ประวัติบทสนทนา",case_file:"แฟ้มคดี",settings:"ตั้งค่า",restart_chapter:"เริ่มบทใหม่",
close:"ปิด",language:"ภาษา",master_sound:"เสียงทั้งหมด",music:"เพลง",sfx:"เสียงประกอบ",
auto_saved:"บันทึกอัตโนมัติแล้ว",manual_saved:"บันทึกเกมแล้ว",no_save:"ยังไม่มีข้อมูลบันทึก",no_dialogue:"ยังไม่มีบทสนทนา",
no_evidence:"ยังไม่พบหลักฐาน",new_evidence:"พบหลักฐานใหม่: ",next_continue:"ดำเนินเรื่องต่อ",next_tap:"แตะเพื่อไปต่อ",
objective_phone:"โทรศัพท์",objective_room:"ในห้อง",objective_phone_data:"ข้อมูลในโทรศัพท์",
phone_title_messages:"ข้อความ",phone_title_calls:"ประวัติการโทร",phone_title_notes:"บันทึก",
phone_unknown:"ไม่ทราบชื่อ",phone_warning:"คุณไม่น่ามาที่นี่เลย",phone_where:"คุณอยู่ไหน",
phone_missed:"ไม่ได้รับสาย",phone_meet:"เจอกันที่ท่าเรือ",phone_11pm:"ห้าทุ่ม",
clue_phone_title:"โทรศัพท์ของผู้ตาย",clue_phone_desc:"โทรศัพท์ยังอยู่ในสภาพสมบูรณ์และเปิดใช้งานได้",
clue_blood_title:"รูปแบบคราบเลือด",clue_blood_desc:"ศพถูกเคลื่อนย้ายหลังเสียชีวิต และห้องนี้ถูกจัดฉากขึ้น",
clue_laptop_title:"แล็ปท็อปที่ถูกล้างข้อมูล",clue_laptop_desc:"ประวัติไฟล์ล่าสุดถูกลบอย่างจงใจ",
clue_suitcase_title:"กระเป๋าเดินทางที่เก็บค้างไว้",clue_suitcase_desc:"ผู้ตายกำลังจะออกจากที่นี่อย่างเร่งรีบ",
clue_message_title:"ข้อความเตือน",clue_message_desc:"ไม่ทราบชื่อ: “คุณไม่น่ามาที่นี่เลย”",
clue_calls_title:"สายที่ไม่ได้รับสามสาย",clue_calls_desc:"R. โทรมาสามครั้งก่อนผู้ตายเสียชีวิตไม่นาน",
clue_note_title:"นัดที่ท่าเรือ",clue_note_desc:"บันทึกที่กู้คืนได้: “เจอกันที่ท่าเรือ ห้าทุ่ม”",
d_office_1:"เบเนดิกต์",d_office_2:"น้ำเสียงแบบนั้น แปลว่ามีคนทำค่ำคืนนี้ของเราพังอีกแล้วสินะ",
d_office_3:"โรงแรมแกรนด์วิว ห้อง 1807 คาดว่าเป็นคดีฆาตกรรม",d_office_4:"ว่าแต่วันนี้คุณดูดีนะ",
d_office_5:"เรากำลังจะไปที่เกิดเหตุ",d_office_6:"ผมไม่เคยเก่งเรื่องเลือกจังหวะอยู่แล้ว",
d_office_7:"เรื่องเงียบก็เหมือนกัน",d_blood_1:"ลักษณะการกระจายของเลือดไม่ถูกต้อง",
d_blood_2:"ไม่ถูกแบบคดีฆาตกรรม หรือแบบซักผ้าไม่ออก",
d_blood_3:"มีการจัดฉาก ศพถูกเคลื่อนย้ายมาไว้ตรงนี้",
d_laptop_1:"รายการไฟล์ล่าสุดว่างเปล่า",d_laptop_2:"ไม่ได้ว่าง ถูกล้างไปแล้ว",
d_laptop_3:"คุณพูดเหมือนมีคนมาดูถูกครอบครัวคุณ",d_laptop_4:"พวกเขาดูถูกประวัติไฟล์",
d_suitcase_1:"เก็บของไว้แค่ครึ่งเดียว เขากำลังจะรีบออกไป",
d_suitcase_2:"เวลาไปเที่ยวธรรมดา ผมก็เก็บของแบบนี้",d_suitcase_3:"นั่นอธิบายอะไรได้เยอะเลย",
d_deduce_1:"คราบเลือด แล็ปท็อปที่ถูกล้างข้อมูล และกระเป๋าที่เก็บค้างไว้ มันเล่าเรื่องเดียวกันไม่ได้",
d_deduce_2:"เพราะมีคนสร้างเรื่องขึ้นมาใหม่หลังจากเขาตายแล้ว",d_deduce_3:"ห้องนี้ถูกจัดฉาก",
d_deduce_4:"และคนที่จัดฉากรู้ว่าเราจะเจอโทรศัพท์",d_deduce_5:"แปลว่าข้อความเตือนนั้นไม่ได้ส่งถึงเขา",
d_deduce_6:"แต่มันส่งถึงเรา",d_call_1:"เบอร์ไม่ทราบชื่อ",d_call_2:"เบเนดิกต์พูดครับ",d_call_3:"...",
d_call_4:"วางสายไปแล้ว",d_call_5:"เขาพูดว่าอะไร",d_call_6:"“พวกคุณดูผิดห้องแล้ว”",chapter_i:"บทที่ 1",chapter_1_name:"ห้อง 1807",chapter_ii:"บทที่ 2",chapter_2_name:"THE PERFECT STRANGER",continue_chapter2:"ไปต่อบทที่ 2",location_office_v2:"สำนักงานนักสืบ • ตอนเช้า",location_victim_apartment:"อพาร์ตเมนต์ของผู้ตาย",choose_response:"เลือกคำตอบ",choice_warm:"วันนี้ดูเหมือนได้นอนจริงๆ นะ",choice_observant:"คุณมาถึงนานแล้วสินะ",choice_direct:"มีคดีอะไรเข้ามา",characters:"ตัวละคร",back:"ย้อนกลับ",unknown_character:"ไม่ทราบชื่อ",trusted_partner:"คู่หูที่ไว้ใจได้",self_status:"นักสืบ",journal_benedict_notes:"ทุกการตัดสินใจของผมเปลี่ยนทิศทางคดี ไม่ว่าตอนนั้นผมจะสังเกตเห็นหรือไม่",journal_north_notes:"เราทำงานด้วยกันมานานพอที่เธอมักเห็นจุดที่ผมมองข้าม",character_added:"เพิ่มตัวละครใหม่: ",chapter2_phase1:"บทที่ 2 • เฟส 1",arrival_apartment:"อพาร์ตเมนต์",phase1_end_text:"การสืบสวนครั้งใหม่เริ่มต้นที่นี่",c2_01:"อรุณสวัสดิ์",c2_02:"ฟังดูเกือบจะมองโลกในแง่ดีเลยนะ",c2_03:"อย่าเพิ่งชินล่ะ",c2_04:"วันนี้ดูเหมือนได้นอนจริงๆ นะ",c2_05:"คุณมาถึงนานแล้วสินะ",c2_06:"มีคดีอะไรเข้ามา",c2_07_warm:"ฉันนอนมา คุณก็น่าจะลองดูบ้างนะ",c2_07_observant:"สี่สิบสามนาที คุณสังเกตกาแฟแก้วที่สอง แต่ไม่ดูเวลา",c2_07_direct:"ผู้เช่าเสียชีวิตหนึ่งคน อพาร์ตเมนต์สะอาดผิดปกติ และมีรายงานมาถึงก่อนตำรวจจะร้องขอ",c2_08:"คดีใหม่เหรอ",c2_09:"อาจจะ ผู้ตายชื่อแดเนียล วอสส์ อายุสามสิบแปด พบเสียชีวิตในอพาร์ตเมนต์ตอนหกโมงยี่สิบ",c2_10:"สาเหตุการตายล่ะ",c2_11:"ยังรอผล แต่มีคนเข้าตึกตอนตีห้าสี่สิบเจ็ดด้วยสิทธิ์ของผู้พักอาศัยที่ไม่ควรมีอยู่",c2_12:"งั้นตึกนี้ก็มีผี...",c2_13:"...หรือมีคนอยากให้เราตามหาผี",c2_14:"ไปดูอพาร์ตเมนต์ก่อน",c2_15:"ฉันส่งที่อยู่เข้ามือถือคุณแล้ว",c2_16:"คุณทำให้งานนักสืบหมดความโรแมนติกจริงๆ",c2_17:"กาแฟมีไว้ชดเชยเรื่องนั้น",new_feature:"ระบบใหม่",journal_unlocked:"ปลดล็อก Character Journal",open_menu_to_view:"เปิดเมนู (☰) เพื่อดู",north_added:"เพิ่ม North ลงในสมุดตัวละครแล้ว",trust:"ความไว้วางใจ",respect:"ความนับถือ",affection:"ความผูกพัน",suspicion:"ความสงสัย",relationship:"ความสัมพันธ์",review_apartment:"ทบทวนหลักฐานในอพาร์ตเมนต์",inspect_apartment:"สำรวจอพาร์ตเมนต์",evidence_count:"หลักฐาน",evidence_found:"พบหลักฐาน",
continue_investigation:"สำรวจต่อ",new_location:"สถานที่ใหม่",location_cafe:"ออร์คิด คาเฟ่",orchid_cafe:"ออร์คิด คาเฟ่",
cafe_arrival_text:"แดเนียล วอสส์นัดพบใครบางคนที่นี่ไม่นานก่อนเสียชีวิต",
apt_mug_title:"แก้วกาแฟสองใบ",apt_mug_desc:"แก้วใบหนึ่งแห้งและเย็นสนิท อีกใบยังมีรอยความชื้นจางๆ แดเนียลไม่ได้อยู่คนเดียวในช่วงเวลาตามรายงานอย่างแน่นอน",
apt_mug_obs:"Benedict: คนที่มาหาเขาอยู่ดื่มกาแฟนานพอสมควร และออกไปก่อนมีผู้แจ้งพบศพ",
apt_documents_title:"บันทึกสิทธิ์เข้าตึกซ้ำ",apt_documents_desc:"รายงานจากระบบอาคารระบุรหัส 18-07 สองครั้ง ครั้งหนึ่งเป็นชื่อแดเนียล วอสส์ อีกครั้งเป็นผู้พักชั่วคราวที่ไม่มีชื่อ",
apt_documents_obs:"North: สิทธิ์ที่ไม่ควรมีอยู่ถูกสร้างจากระบบภายในอาคารเอง",
apt_board_title:"กระดานสืบสวนส่วนตัว",apt_board_desc:"แดเนียลเชื่อมโยงโรงแรม 1807 บริษัทบังหน้าสามแห่ง และบันทึกด้วยลายมือว่า ‘ถาม E. เรื่องเวลาที่แก้ไขแล้ว’",
apt_board_obs:"Benedict: เขากำลังสืบบางอย่าง ก่อนที่ตัวเองจะกลายเป็นส่วนหนึ่งของมัน",
apt_laptop_title:"ร่างข้อความนัดพบที่คาเฟ่",apt_laptop_desc:"ร่างข้อความที่กู้คืนได้ระบุออร์คิด คาเฟ่ เวลา 09:30 ช่องผู้รับถูกลบ แต่ข้อความเขียนว่า ‘นำรายงานต้นฉบับมา มาคนเดียว’",
apt_laptop_obs:"North: ร่างนี้ถูกแก้ไขตอนตีห้าห้าสิบเอ็ด สี่นาทีหลังรหัสปริศนาเข้าตึก",
apt_intro_01:"อพาร์ตเมนต์สะอาดดี",apt_intro_02:"สะอาดเกินไปเหรอ",apt_intro_03:"เป็นระเบียบแบบตั้งใจ มีคนทิ้งเฉพาะสิ่งที่อยากให้เราเห็น",
apt_intro_04:"งั้นก็มาดูสิ่งที่เขาลืมเก็บกัน",
apt_review_01:"กาแฟสำหรับสองคน รหัสเข้าตึกที่ถูกทำซ้ำ แล้วก็โรงแรม 1807 บนกระดานของเขา",
apt_review_02:"กับนัดที่ออร์คิด คาเฟ่ หลังเวลาที่เขาเสียชีวิตไปแล้ว",
apt_review_03:"มีคนคาดว่าแดเนียลจะไปตามนัดนั้น",
apt_review_04:"หรือคาดว่าเราจะเจอมัน",
apt_review_05:"ไม่ว่าแบบไหน คาเฟ่คือจุดหมายต่อไป",
cafe_scene_label:"การพบกันครั้งแรก",elena_added_note:"เพิ่ม Elena ลงใน Character Journal แล้ว",
forensic_analyst:"นักวิเคราะห์นิติวิทยาศาสตร์",journal_elena_notes:"สุขุม แม่นยำ และเตรียมตัวมาดีกว่าที่คาด เธอแก้ไขส่วนหนึ่งของไทม์ไลน์ก่อนเราจะพบกัน",
cafe_choice_friendly:"คุณเตรียมตัวมาดีนะ",cafe_choice_analytical:"คุณแก้ไทม์ไลน์ก่อนพวกเรามาถึง",cafe_choice_guarded:"แดเนียลบอกอะไรคุณไว้บ้าง",
location_police_station:"กองสืบสวนตำรวจนครบาล",police_station_title:"สถานีตำรวจ",police_arrival_text:"บันทึกการเข้าออกฉบับแก้ไขกำลังรออยู่ชั้นบน",
cafe_01:"เธอมาถึงแล้ว",cafe_02:"พยานเหรอ",cafe_03:"ไม่ใช่ Elena",
cafe_04:"คุณคงเป็น Benedict",cafe_05:"ก็แล้วแต่นะ นี่คือช่วงที่ผมต้องปฏิเสธทุกอย่างหรือเปล่า",
cafe_06:"เฉพาะกรณีที่คุณสั่งกาแฟแก้วที่สอง",cafe_07:"ฉันไม่ได้สั่ง แดเนียลเป็นคนสั่ง",
cafe_08:"ตอนเก้าโมงครึ่ง หลังเวลาตายโดยประมาณของเขา",cafe_09:"เวลาประมาณนั้นผิด",
cafe_10:"คุณฟังดูมั่นใจ",cafe_11:"ฉันตรวจการสูญเสียความร้อนจากภาพในอพาร์ตเมนต์ รายงานฉบับแรกปัดค่าหยาบเกินไป",
cafe_12:"คุณแก้ไทม์ไลน์ก่อนพวกเรามาถึง",cafe_13:"ฉันแค่แก้ตัวเลข ไทม์ไลน์ยังเป็นงานของพวกคุณ",
cafe_friendly_01:"คุณเตรียมตัวมาดีนะ",cafe_friendly_02:"ฉันไม่ชอบทำให้เช้าของคนอื่นเสียเวลา",
cafe_analytical_01:"คุณแก้ไทม์ไลน์ก่อนพวกเรามาถึง",cafe_analytical_02:"เฉพาะส่วนที่วัดผลได้เท่านั้น",
cafe_guarded_01:"แดเนียลบอกอะไรคุณไว้บ้าง",cafe_guarded_02:"มากพอให้รู้ว่าเขากลัว แต่ไม่มากพอให้รู้ว่ากลัวใคร",
cafe_14:"แดเนียลขอให้ฉันตรวจรายงานพิษวิทยาฉบับต้นฉบับ",
cafe_15:"ฉบับต้นฉบับ หมายความว่ามีฉบับแก้ไขด้วยสินะ",
cafe_16:"ฉบับแก้ไขเปลี่ยนเวลาเก็บตัวอย่างไปสิบเอ็ดนาที",
cafe_17:"สิบเอ็ดนาที เจาะจงดีนะ",cafe_18:"ความผิดพลาดที่เจาะจง มักมีประโยชน์กว่าความจริงที่คลุมเครือ",
cafe_19:"ตอนนี้ต้นฉบับอยู่ไหน",cafe_20:"ที่สถานีตำรวจ ฝ่ายรับหลักฐานลงทะเบียนไว้เมื่อเช้า",
cafe_21:"ก่อนพบศพแดเนียลเหรอ",cafe_22:"สามนาทีก่อน",
cafe_23:"สะดวกดีนะ",cafe_24:"ไม่หรอก ถ้าสะดวกจริง เรื่องนี้คงง่ายกว่านี้",
cafe_25:"ไปดูบันทึกกัน",cafe_26:"ฉันจะไปเจอที่นั่น ฉันมีกุญแจแล็บที่พวกเขาไม่ยอมให้คุณยืม",
cafe_27:"ผมนึกว่าเสน่ห์ยังใช้เปิดประตูได้อยู่",cafe_28:"ได้สิ แค่ไม่ค่อยเปิดถูกบานเท่านั้น",
developer_console:"Developer Console",developer_access:"สิทธิ์นักพัฒนา",enter_access_code:"กรอกรหัสเข้าใช้งาน",
authenticate:"ยืนยันตัวตน",auth_success:"ยืนยันตัวตนสำเร็จ",auth_failed:"การยืนยันตัวตนล้มเหลว",
console_unlocked:"ปลดล็อก Developer Console แล้ว",developer_internal:"Developer Console · สิทธิ์ภายใน",
jump_location:"ข้ามไปยังสถานที่",developer_tools:"เครื่องมือนักพัฒนา",dev_office:"บทที่ 2 · สำนักงาน",
dev_apartment:"อพาร์ตเมนต์ของผู้ตาย",dev_cafe:"ออร์คิด คาเฟ่",dev_police:"สถานีตำรวจ",
unlock_characters:"ปลดล็อกตัวละคร",unlock_evidence:"ปลดล็อกหลักฐาน",reset_choice_flags:"รีเซ็ต Choice Flags",
reset_all_saves:"ลบเซฟทั้งหมด",lock_developer_access:"ล็อกสิทธิ์นักพัฒนา",dev_action_complete:"ดำเนินการสำหรับนักพัฒนาแล้ว",evidence_inspection:"ตรวจสอบหลักฐาน",case_evidence:"หลักฐานในคดี",tap_to_inspect:"แตะหลักฐานเพื่อตรวจดู",inspect_evidence:"ตรวจสอบ",collect_evidence:"เก็บหลักฐาน",evidence_collected:"เก็บหลักฐานแล้ว"
}
};

LANG.en.police_captain="Police Captain";
LANG.th.police_captain="ร้อยตำรวจเอก · หัวหน้าคดี";
LANG.en.investigation_officer="Investigation Officer";
LANG.th.investigation_officer="ดาบตำรวจ · เจ้าหน้าที่สืบสวน";
LANG.en.journal_kittisak_notes="Police captain overseeing the Voss evidence chain. Strict about procedure, but willing to cooperate when the anomaly justifies it.";
LANG.th.journal_kittisak_notes="หัวหน้าตำรวจผู้กำกับดูแลสายการครอบครองหลักฐานในคดี Voss เคร่งครัดเรื่องขั้นตอน แต่พร้อมร่วมมือเมื่อความผิดปกติมีน้ำหนักเพียงพอ";
LANG.en.journal_somchai_notes="Investigation officer supporting Evidence Division intake. Flirtatious and theatrical, but observant and competent once the work begins.";
LANG.th.journal_somchai_notes="เจ้าหน้าที่สืบสวนที่ช่วยงานฝ่ายรับหลักฐาน ช่างจีบและเล่นใหญ่ แต่สังเกตเก่งและทำงานมีประสิทธิภาพเมื่อเข้าสู่เรื่องคดี";

const LANGUAGE_KEY="last_witness_language";
function L(key){return(LANG[state.language]&&LANG[state.language][key])||LANG.en[key]||key}
let activeDialogueRender=null;
function applyLanguage(){
document.documentElement.lang=state.language;
document.title=state.language==="th"?"Last Witness — บทที่ 1":"Last Witness — Chapter 1";
$$("[data-i18n]").forEach(element=>{element.textContent=L(element.dataset.i18n)});
if($("#charactersModal")&&$("#charactersModal").classList.contains("open")&&state.journal&&state.journal.introShown)renderCharacterGrid();
if(state.screen==="apartment2")refreshApartment();
$("#phoneTap").dataset.label=L("tap_phone");
if($("#chapterIntroNumber")){const currentChapter=state.chapter||1;$("#chapterIntroNumber").textContent=L(currentChapter===2?"chapter_ii":"chapter_i");$("#chapterIntroTitle").textContent=L(currentChapter===2?"chapter_2_name":"chapter_1_name")}
$$("[data-lang]").forEach(button=>button.classList.toggle("active",button.dataset.lang===state.language));
refreshCrime();
if(state.screen==="summary")renderSummary();
if(activeDialogueRender)activeDialogueRender();
}
function setLanguage(language){
if(!LANG[language])return;
state.language=language;
localStorage.setItem(LANGUAGE_KEY,language);
applyLanguage();
}

const clueData={
phone:["clue_phone_title","clue_phone_desc"],
blood:["clue_blood_title","clue_blood_desc"],
laptop:["clue_laptop_title","clue_laptop_desc"],
suitcase:["clue_suitcase_title","clue_suitcase_desc"],
message:["clue_message_title","clue_message_desc"],
calls:["clue_calls_title","clue_calls_desc"],
note:["clue_note_title","clue_note_desc"],
apt_mug:["apt_mug_title","apt_mug_desc"],
apt_documents:["apt_documents_title","apt_documents_desc"],
apt_board:["apt_board_title","apt_board_desc"],
apt_laptop:["apt_laptop_title","apt_laptop_desc"]
};
let state={screen:"splash",found:new Set(),history:[],sound:true,music:.33,sfx:.55,language:localStorage.getItem(LANGUAGE_KEY)||"en",chapter:1,checkpoint:"ch1_start",characters:{Benedict:true,North:false,Elena:false},relationships:{North:{trust:70,respect:78,attachment:58,suspicion:3}},flags:{},personality:{warm:0,observant:0,direct:0},journal:{unlocked:false,seen:false,introShown:false}};
