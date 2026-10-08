(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const d of i)if(d.type==="childList")for(const g of d.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&n(g)}).observe(document,{childList:!0,subtree:!0});function e(i){const d={};return i.integrity&&(d.integrity=i.integrity),i.referrerPolicy&&(d.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?d.credentials="include":i.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function n(i){if(i.ep)return;i.ep=!0;const d=e(i);fetch(i.href,d)}})();const H={user:{name:"Ramesh Chandra Sharma",preferredName:"Dadaji",age:74,gender:"Male",bloodGroup:"B+",role:"senior",email:"ramesh.sharma74@gmail.com",avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",caregiver:{name:"Ananya Sharma Verma",relation:"Daughter",phone:"+91 98765 43210",email:"ananya.verma@example.com",whatsapp:"+919876543210"},doctor:{name:"Dr. A. K. Banerjee",specialty:"Senior Cardiologist",hospital:"Apollo Heart Centre, New Delhi",phone:"+91 98111 22334"}},uiMode:"senior",theme:"dark",language:"hi",highContrast:!1,soundEnabled:!0,hydration:{current:5,target:8,unit:"glasses"},dailyCheckIn:{completedToday:!0,mood:"good",cognitiveScore:4,notes:"Feeling light-headed around 4 PM, slept 7 hours peacefully.",timestamp:new Date().toISOString()},medications:[{id:"med-1",name:"Amlodipine (Norvasc)",dosage:"5 mg",slot:"Morning",time:"08:30 AM",foodRelation:"After Breakfast",shape:"circle",color:"#38bdf8",purpose:"Blood Pressure control",takenToday:!0,takenAt:"08:45 AM",stock:18,refillThreshold:5,instructions:"Do not skip; swallow whole with water."},{id:"med-2",name:"Metformin Glycomet",dosage:"500 mg",slot:"Morning",time:"08:30 AM",foodRelation:"With Breakfast",shape:"capsule",color:"#fb923c",purpose:"Diabetes Sugar control",takenToday:!0,takenAt:"08:46 AM",stock:24,refillThreshold:7,instructions:"Take with meal to avoid stomach upset."},{id:"med-3",name:"Eco-Aspirin",dosage:"75 mg",slot:"Afternoon",time:"01:30 PM",foodRelation:"After Lunch",shape:"circle",color:"#ec4899",purpose:"Heart protection / blood thinner",takenToday:!1,takenAt:null,stock:12,refillThreshold:5,instructions:"Take after lunch. Avoid taking empty stomach."},{id:"med-4",name:"Atorvastatin (Atorva)",dosage:"10 mg",slot:"Night",time:"09:00 PM",foodRelation:"After Dinner",shape:"oval",color:"#a855f7",purpose:"Cholesterol regulation",takenToday:!1,takenAt:null,stock:4,refillThreshold:6,instructions:"Take at bedtime consistently."},{id:"med-5",name:"Calcium + Vit D3",dosage:"500 IU",slot:"Night",time:"09:00 PM",foodRelation:"After Dinner",shape:"capsule",color:"#10b981",purpose:"Bone density & joint support",takenToday:!1,takenAt:null,stock:30,refillThreshold:10,instructions:"Take with warm milk or water."}],vitals:[{id:"v1",date:"2026-10-02",time:"08:00 AM",systolic:132,diastolic:84,pulse:72,bloodSugar:110,sugarType:"Fasting",spo2:98,weight:68.2},{id:"v2",date:"2026-10-03",time:"08:15 AM",systolic:135,diastolic:86,pulse:74,bloodSugar:115,sugarType:"Fasting",spo2:97,weight:68},{id:"v3",date:"2026-10-04",time:"08:10 AM",systolic:138,diastolic:88,pulse:76,bloodSugar:122,sugarType:"Fasting",spo2:98,weight:68.1},{id:"v4",date:"2026-10-05",time:"08:30 AM",systolic:146,diastolic:92,pulse:82,bloodSugar:148,sugarType:"Post-Meal",spo2:96,weight:68.3},{id:"v5",date:"2026-10-06",time:"08:20 AM",systolic:154,diastolic:95,pulse:85,bloodSugar:162,sugarType:"Post-Meal",spo2:97,weight:68.5},{id:"v6",date:"2026-10-07",time:"08:00 AM",systolic:160,diastolic:98,pulse:88,bloodSugar:138,sugarType:"Fasting",spo2:96,weight:68.4},{id:"v7",date:"2026-10-08",time:"08:15 AM",systolic:158,diastolic:96,pulse:84,bloodSugar:130,sugarType:"Fasting",spo2:97,weight:68.4}],appointments:[{id:"apt-1",title:"Cardiology Review & Echo Test",doctor:"Dr. A. K. Banerjee",hospital:"Apollo Heart Centre, New Delhi",date:"2026-10-12",time:"10:30 AM",type:"Doctor",notes:"Carry recent BP log and eco-aspirin prescription."},{id:"apt-2",title:"Knee Physiotherapy Session",doctor:"Dr. Pooja Mehra (PT)",hospital:"Home Visit Care",date:"2026-10-09",time:"04:30 PM",type:"Therapy",notes:"Keep knee heating pad ready."},{id:"apt-3",title:"Fasting Blood Sugar & HbA1c Lab Test",doctor:"Lal PathLabs Sample Collection",hospital:"Home Collection",date:"2026-10-15",time:"07:30 AM",type:"Lab",notes:"10 hours fasting required before sample."}],dailyActivities:[{id:"act-1",title:"Morning Walk in Garden",time:"06:45 AM",completed:!0,icon:"🚶"},{id:"act-2",title:"Pranayama & Deep Breathing",time:"07:30 AM",completed:!0,icon:"🧘"},{id:"act-3",title:"Sunlight & Vitamin D Exposure",time:"09:30 AM",completed:!0,icon:"☀️"},{id:"act-4",title:"Evening Stretch / Light Walk",time:"05:30 PM",completed:!1,icon:"🌳"},{id:"act-5",title:"Video Call with Granddaughter Tara",time:"07:00 PM",completed:!1,icon:"📱"}]};class W{constructor(){this.subscribers=[],this.state=this.loadState()}loadState(){try{const t=localStorage.getItem("saarthi_health_state_v1");if(t)return{...H,...JSON.parse(t)}}catch(t){console.warn("Could not load stored state, using defaults:",t)}return{...H}}saveState(){try{localStorage.setItem("saarthi_health_state_v1",JSON.stringify(this.state))}catch(t){console.warn("Could not persist state:",t)}}getState(){return this.state}subscribe(t){return this.subscribers.push(t),()=>{this.subscribers=this.subscribers.filter(e=>e!==t)}}async notify(t,e){this.saveState(),fetch("http://localhost:4000/api/state",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.state)}).catch(n=>console.warn("Backend sync failed:",n)),this.subscribers.forEach(n=>{try{n(this.state,t,e)}catch(i){console.error("Subscriber notification error:",i)}})}toggleMedication(t){const e=this.state.medications.find(n=>n.id===t);if(e){if(e.takenToday=!e.takenToday,e.takenToday){const n=new Date;e.takenAt=n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),e.stock=Math.max(0,e.stock-1)}else e.takenAt=null,e.stock+=1;this.notify("medication_updated",e)}}addMedication(t){this.state.medications.push({id:"med-"+Date.now(),takenToday:!1,takenAt:null,...t}),this.notify("medication_added",t)}updateMedication(t,e){const n=this.state.medications.findIndex(i=>i.id===t);n!==-1&&(this.state.medications[n]={...this.state.medications[n],...e},this.notify("medication_updated",this.state.medications[n]))}deleteMedication(t){this.state.medications=this.state.medications.filter(e=>e.id!==t),this.notify("medication_deleted",t)}addAppointment(t){const e={id:"apt-"+Date.now(),...t};this.state.appointments.push(e),this.notify("appointment_added",e)}updateAppointment(t,e){const n=this.state.appointments.findIndex(i=>i.id===t);n!==-1&&(this.state.appointments[n]={...this.state.appointments[n],...e},this.notify("appointment_updated",this.state.appointments[n]))}deleteAppointment(t){this.state.appointments=this.state.appointments.filter(e=>e.id!==t),this.notify("appointment_deleted",t)}addActivity(t){const e={id:"act-"+Date.now(),completed:!1,icon:"🏃‍♂️",...t};this.state.dailyActivities.push(e),this.notify("activity_added",e)}updateActivity(t,e){const n=this.state.dailyActivities.findIndex(i=>i.id===t);n!==-1&&(this.state.dailyActivities[n]={...this.state.dailyActivities[n],...e},this.notify("activity_updated",this.state.dailyActivities[n]))}deleteActivity(t){this.state.dailyActivities=this.state.dailyActivities.filter(e=>e.id!==t),this.notify("activity_deleted",t)}addHydration(){this.state.hydration.current<15&&(this.state.hydration.current+=1,this.notify("hydration_updated",this.state.hydration))}resetHydration(){this.state.hydration.current=0,this.notify("hydration_updated",this.state.hydration)}addVitals(t){const e={id:"v-"+Date.now(),date:new Date().toISOString().split("T")[0],time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),...t};this.state.vitals.push(e),this.notify("vitals_added",e)}toggleActivity(t){const e=this.state.dailyActivities.find(n=>n.id===t);e&&(e.completed=!e.completed,this.notify("activity_updated",e))}setMood(t,e=""){this.state.dailyCheckIn={completedToday:!0,mood:t,notes:e||this.state.dailyCheckIn.notes,timestamp:new Date().toISOString(),cognitiveScore:this.state.dailyCheckIn.cognitiveScore||4},this.notify("checkin_updated",this.state.dailyCheckIn)}switchMode(t){(t==="senior"||t==="caregiver")&&(this.state.uiMode=t,this.notify("mode_changed",t))}setTheme(t){(t==="dark"||t==="light")&&(this.state.theme=t,this.notify("theme_changed",t))}setLanguage(t){(t==="hi"||t==="en")&&(this.state.language=t,this.notify("language_changed",t))}setUser(t){this.state.user={...this.state.user,...t},this.notify("user_updated",this.state.user)}resetDemoData(){this.state=JSON.parse(JSON.stringify(H)),this.notify("data_reset",this.state)}}const y=new W;class j{constructor(){this.ctx=null,this.muted=!1}init(){if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}playSuccess(){if(this.muted||(this.init(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createOscillator(),i=this.ctx.createGain();e.type="sine",n.type="triangle",e.frequency.setValueAtTime(523.25,t),e.frequency.exponentialRampToValueAtTime(659.25,t+.12),e.frequency.exponentialRampToValueAtTime(783.99,t+.25),n.frequency.setValueAtTime(261.63,t),n.frequency.exponentialRampToValueAtTime(329.63,t+.25),i.gain.setValueAtTime(.01,t),i.gain.linearRampToValueAtTime(.2,t+.05),i.gain.exponentialRampToValueAtTime(.001,t+.6),e.connect(i),n.connect(i),i.connect(this.ctx.destination),e.start(t),n.start(t),e.stop(t+.65),n.stop(t+.65)}playWater(){if(this.muted||(this.init(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(800,t),e.frequency.exponentialRampToValueAtTime(1400,t+.1),n.gain.setValueAtTime(.2,t),n.gain.exponentialRampToValueAtTime(.001,t+.25),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.25)}playReminder(){if(this.muted||(this.init(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(587.33,t),e.frequency.setValueAtTime(880,t+.15),n.gain.setValueAtTime(.15,t),n.gain.exponentialRampToValueAtTime(.001,t+.5),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.55)}playTick(){if(this.muted||(this.init(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="square",e.frequency.setValueAtTime(440,t),n.gain.setValueAtTime(.1,t),n.gain.exponentialRampToValueAtTime(.001,t+.08),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.09)}playAlarm(){if(this.muted||(this.init(),!this.ctx))return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(700,t),e.frequency.linearRampToValueAtTime(1100,t+.25),e.frequency.linearRampToValueAtTime(700,t+.5),n.gain.setValueAtTime(.25,t),n.gain.exponentialRampToValueAtTime(.01,t+.5),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.5)}}const E=new j;class U{constructor(){this.synth=window.speechSynthesis,this.recognition=null,this.isListening=!1,this.isSpeaking=!1,this.onStateChange=null,this.initRecognition()}initRecognition(){const t=window.SpeechRecognition||window.webkitSpeechRecognition;t&&(this.recognition=new t,this.recognition.continuous=!1,this.recognition.interimResults=!1,this.recognition.lang=y.getState().language==="hi"?"hi-IN":"en-IN",this.recognition.onstart=()=>{this.isListening=!0,this.notifyState()},this.recognition.onresult=e=>{const n=e.results[0][0].transcript;console.log("Voice transcript heard:",n),this.handleCommand(n)},this.recognition.onerror=e=>{console.warn("Speech recognition notice:",e.error),this.isListening=!1,this.notifyState()},this.recognition.onend=()=>{this.isListening=!1,this.notifyState()})}notifyState(){this.onStateChange&&this.onStateChange({isListening:this.isListening,isSpeaking:this.isSpeaking})}toggleListening(){if(!this.recognition){this.speak("Speech recognition is not supported in this browser. Please use Chrome or Edge.","इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।");return}if(this.isListening)this.recognition.stop();else{E.playReminder(),this.recognition.lang=y.getState().language==="hi"?"hi-IN":"en-IN";try{this.recognition.start()}catch(t){console.warn("Recognition start error:",t)}}}speak(t,e){if(!this.synth)return;this.synth.cancel();const i=y.getState().language==="hi",d=i&&e||t,g=new SpeechSynthesisUtterance(d);g.rate=.88,g.pitch=1.05;const o=this.synth.getVoices();if(i){const u=o.find(l=>l.lang.includes("hi")||l.name.includes("Hindi"));u?g.voice=u:g.lang="hi-IN"}else{const u=o.find(l=>l.lang.includes("en-IN")||l.lang.includes("en-GB")||l.lang.includes("en-US"));u?g.voice=u:g.lang="en-US"}g.onstart=()=>{this.isSpeaking=!0,this.notifyState()},g.onend=()=>{this.isSpeaking=!1,this.notifyState()},g.onerror=()=>{this.isSpeaking=!1,this.notifyState()},this.synth.speak(g)}handleCommand(t){const e=t.toLowerCase().trim(),n=y.getState();if(n.language,e.includes("help")||e.includes("bachao")||e.includes("madad")||e.includes("emergency")||e.includes("sos")||e.includes("gir gaya")||e.includes("fallen")){window.dispatchEvent(new CustomEvent("saarthi-trigger-sos")),this.speak("Emergency SOS initiated. Alerting your family right now.","आपातकालीन एसओएस शुरू किया गया है। आपके परिवार को तुरंत सतर्क किया जा रहा है।");return}if(e.includes("took")||e.includes("goli le li")||e.includes("dawai le li")||e.includes("taken")||e.includes("kha li")){const o=n.medications.filter(u=>!u.takenToday);if(o.length>0){let u=o.find(r=>e.includes(r.name.toLowerCase().split(" ")[0]));u||(u=o[0]),y.toggleMedication(u.id),E.playSuccess();const l=`Wonderful! Logged ${u.name} as taken. Great job staying healthy!`,c=`बहुत बढ़िया दादाजी! ${u.name} ले ली गई है। आपकी सेहत का ख्याल रखना हमारा काम है।`;this.speak(l,c)}else this.speak("All scheduled medicines for today have already been marked as taken! You are doing fantastic.","आज की सभी निर्धारित दवाएं पहले ही ली जा चुकी हैं! आप बहुत अच्छा कर रहे हैं।");return}if(e.includes("paani")||e.includes("pani")||e.includes("water")||e.includes("drank")||e.includes("piya")){y.addHydration(),E.playWater();const o=y.getState().hydration.current,u=`Logged 1 glass of water. You have reached ${o} out of 8 glasses today. Stay well hydrated!`,l=`शाबाश! एक गिलास पानी दर्ज कर लिया गया है। आज कुल ${o} गिलास हो चुके हैं।`;this.speak(u,l);return}const i=e.match(/(\d{2,3})\s*(?:by|over|\/|\s)\s*(\d{2,3})/);if((e.includes("bp")||e.includes("pressure")||e.includes("blood pressure"))&&i){const o=parseInt(i[1],10),u=parseInt(i[2],10);y.addVitals({systolic:o,diastolic:u,pulse:76,bloodSugar:120,sugarType:"Recorded",spo2:98,weight:68.4}),E.playSuccess();const l=`Blood pressure recorded as ${o} over ${u} mmHg. AI health analysis updated.`,c=`ब्लड प्रेशर ${o} और ${u} दर्ज कर लिया गया है। स्वास्थ्य विश्लेषण अपडेट हो गया है।`;this.speak(l,c);return}if(e.includes("next")||e.includes("agli")||e.includes("kab hai")||e.includes("schedule")||e.includes("timing")){const o=n.medications.filter(u=>!u.takenToday);if(o.length>0){const u=o[0],l=`Your next medicine is ${u.name} (${u.dosage}) scheduled for ${u.slot} at ${u.time}, ${u.foodRelation}.`,c=`आपकी अगली दवा है ${u.name}, जो ${u.slot} में ${u.time} बजे लेनी है, ${u.foodRelation}।`;this.speak(l,c)}else this.speak("All medications for today have been taken! Rest well.","आज की सभी दवाएं पूरी हो चुकी हैं। आप आराम कीजिए।");return}if(e.includes("doctor")||e.includes("appointment")||e.includes("hospital")||e.includes("clinic")){const o=n.appointments[0];if(o){const u=`You have an appointment with ${o.doctor} on ${o.date} at ${o.time} for ${o.title}.`,l=`आपका अगला अपॉइंटमेंट ${o.doctor} के साथ ${o.date} को ${o.time} बजे है।`;this.speak(u,l)}else this.speak("You have no pending doctor appointments for this week.","इस सप्ताह कोई डॉक्टर अपॉइंटमेंट नहीं है।");return}if(e.includes("kaise ho")||e.includes("kaisa hai")||e.includes("hello")||e.includes("namaste")||e.includes("hi saarthi")){this.speak("Namaste Dadaji! I am Saarthi, your health companion. How are you feeling right now? Remember to drink some water.","नमस्ते दादाजी! मैं आपका सारथी हूँ। आप अभी कैसा महसूस कर रहे हैं? अगर कोई परेशानी हो तो मुझे बताएं।");return}const d=`I heard: "${t}". You can ask me to log your medicines, check your BP, add water, or read doctor appointments.`,g=`मैंने सुना: "${t}"। आप मुझसे दवा नोट करने, पानी जोड़ने या डॉक्टर अपॉइंटमेंट पूछने के लिए कह सकते हैं।`;this.speak(d,g)}}const k=new U;function D(a){const t=[],e=a.vitals||[],n=a.medications||[],i=a.hydration||{current:0};if(a.dailyCheckIn,e.length>=3){const c=e.slice(-3),r=c[c.length-1],f=c[c.length-2],A=c[0],$=r.systolic>f.systolic&&f.systolic>A.systolic;r.systolic>=150||r.diastolic>=95||$?t.push({id:"pattern-bp-rising",severity:r.systolic>=160?"critical":"warning",category:"Cardiovascular Pattern",title:"Escalating Systolic Blood Pressure Trend",titleHi:"रक्तचाप (BP) में लगातार बढ़त का संकेत",metric:`${r.systolic}/${r.diastolic} mmHg (Peak: ${Math.max(...c.map(s=>s.systolic))})`,observation:`Systolic BP increased across the last 3 recordings (${A.systolic} → ${f.systolic} → ${r.systolic} mmHg).`,observationHi:`पिछले 3 रिकॉर्डिंग्स में सिस्टोलिक बीपी लगातार बढ़ा है (${A.systolic} → ${f.systolic} → ${r.systolic} mmHg)।`,aiDiagnosis:"Correlates with inconsistent evening timing or elevated salt/stress. Risk of hypertensive urgency if sustained above 160 mmHg.",actionRequired:"Ensure Amlodipine 5mg was taken. Retake BP sitting after 15 mins of rest. Alert sent to Dr. Banerjee & Ananya.",actionRequiredHi:"कृपया 15 मिनट शांत बैठकर दोबारा नापें। डॉ. बनर्जी और बेटी अनन्या को सूचित कर दिया गया है।",urgency:r.systolic>=160?"Immediate Attention":"Moderate Monitoring",badge:"AI Pattern Detected"}):r.systolic<=130&&r.diastolic<=85&&t.push({id:"pattern-bp-stable",severity:"positive",category:"Cardiovascular Health",title:"Blood Pressure in Healthy Target Range",titleHi:"रक्तचाप सामान्य और स्थिर है",metric:`${r.systolic}/${r.diastolic} mmHg`,observation:"Current blood pressure is well within the recommended elderly target (<135/85 mmHg).",observationHi:"वर्तमान बीपी बिलकुल संतुलित और सामान्य श्रेणी में है।",aiDiagnosis:"Excellent vascular stability. Current medication regimen is effectively protective.",actionRequired:"Continue current schedule and light morning walk.",actionRequiredHi:"अपनी नियमित दिनचर्या और दवाएं जारी रखें।",urgency:"Optimal",badge:"Good Health Trend"})}if(e.length>0){const c=e[e.length-1];c.bloodSugar>150&&t.push({id:"pattern-sugar-high",severity:"warning",category:"Glycemic Fluctuation",title:"Elevated Blood Glucose Level",titleHi:"ब्लड शुगर सामान्य से अधिक (हाई शुगर)",metric:`${c.bloodSugar} mg/dL (${c.sugarType||"Recorded"})`,observation:`Latest glucose reading recorded at ${c.bloodSugar} mg/dL, exceeding baseline threshold of 140 mg/dL.`,observationHi:`ताज़ा शुगर लेवल ${c.bloodSugar} mg/dL दर्ज हुआ है, जो सामान्य से अधिक है।`,aiDiagnosis:"High glucose reading post-meal indicates delayed insulin sensitivity or carbohydrate-heavy meal.",actionRequired:"Drink 2 glasses of water, avoid sugary sweets/tea, and verify Metformin was taken with food.",actionRequiredHi:"गुनगुना पानी पिएं, मीठी चाय/मिठाई से परहेज रखें और मेटफॉर्मिन समय पर लें।",urgency:"Action Advised",badge:"Glycemic Anomaly"})}const d=e.length>0?e[e.length-1].pulse:75;i.current<4&&d>80&&t.push({id:"pattern-dehydration-pulse",severity:"warning",category:"Hydration & Circulatory",title:"Potential Mild Dehydration (Elevated Pulse)",titleHi:"पानी की कमी और दिल की धड़कन तेज होने का संकेत",metric:`${i.current}/8 Glasses | Pulse: ${d} bpm`,observation:`Only ${i.current} glasses of water consumed today, while resting heart rate has elevated to ${d} bpm.`,observationHi:`आज केवल ${i.current} गिलास पानी पिया गया है और पल्स ${d} bpm तक बढ़ गई है।`,aiDiagnosis:"In seniors, inadequate fluid intake quickly causes blood volume reduction, reflex tachycardia, and dizziness risks.",actionRequired:"Encourage drinking 1 glass of coconut water or warm electrolyte water right now.",actionRequiredHi:"कृपया तुरंत 1 गिलास ताजा पानी या नारियल पानी पिएं।",urgency:"Preventive Care",badge:"Dehydration Risk"});const g=n.filter(c=>c.stock<=c.refillThreshold);g.length>0&&g.forEach(c=>{t.push({id:`pattern-refill-${c.id}`,severity:"info",category:"Pharmacy Supply",title:`Medicine Stock Depleting: ${c.name}`,titleHi:`दवा समाप्त होने वाली है: ${c.name}`,metric:`${c.stock} Tablets Remaining (~${c.stock} days)`,observation:`Only ${c.stock} doses of ${c.name} (${c.dosage}) left in home medicine box.`,observationHi:`${c.name} की केवल ${c.stock} गोलियां शेष बची हैं।`,aiDiagnosis:"Running out of prescribed maintenance medication risks rebound hypertension/dyslipidemia.",actionRequired:"1-Click WhatsApp reorder alert triggered for Caregiver Ananya.",actionRequiredHi:"केयरगिवर को फार्मेसी से री-ऑर्डर करने का संदेश तैयार है।",urgency:"Order in 48h",badge:"Low Stock Alert"})});const o=n.length,u=n.filter(c=>c.takenToday).length,l=o>0?Math.round(u/o*100):100;return{alerts:t,adherencePercent:l,takenMeds:u,totalMeds:o,vitalsCount:e.length,overallHealthIndex:F(t,l),lastAnalyzed:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}}function F(a,t){let e=90;return a.forEach(n=>{n.severity==="critical"?e-=25:n.severity==="warning"?e-=12:n.severity==="positive"&&(e+=5)}),t<60?e-=15:t===100&&(e+=5),e=Math.min(100,Math.max(35,e)),e>=85?{score:e,status:"Optimal",color:"#10b981",text:"Healthy & Stable"}:e>=70?{score:e,status:"Moderate",color:"#f59e0b",text:"Requires Mild Monitoring"}:{score:e,status:"Needs Care",color:"#ef4444",text:"Caregiver Attention Advised"}}function _(a,t){const e=document.getElementById(a);if(!e)return;if(!t||t.length===0){e.innerHTML='<div class="empty-state">No vitals data recorded yet.</div>';return}const n=Y(t),i=z(t);e.innerHTML=`
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-wrap">
            <span class="chart-icon">🩺</span>
            <div>
              <h4 class="chart-title">Blood Pressure 7-Day Trend</h4>
              <p class="chart-subtitle">Systolic (Top) & Diastolic (Bottom) in mmHg</p>
            </div>
          </div>
          <div class="chart-legend">
            <span class="legend-dot systolic"></span> Systolic (Target &lt;130)
            <span class="legend-dot diastolic"></span> Diastolic (Target &lt;85)
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${n}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title-wrap">
            <span class="chart-icon">🩸</span>
            <div>
              <h4 class="chart-title">Blood Glucose 7-Day Trend</h4>
              <p class="chart-subtitle">Fasting & Post-Meal Glucose in mg/dL</p>
            </div>
          </div>
          <div class="chart-legend">
            <span class="legend-dot sugar"></span> Glucose (Target 80-130)
            <span class="legend-threshold"></span> Normal Threshold (140)
          </div>
        </div>
        <div class="chart-svg-wrap">
          ${i}
        </div>
      </div>
    </div>
  `}function Y(a){const r=m=>185-(m-60)/120*155,f=m=>45+m/(a.length-1||1)*490,A=a.map((m,v)=>`${f(v)},${r(m.systolic)}`).join(" "),$=a.map((m,v)=>`${f(v)},${r(m.diastolic)}`).join(" "),b=[80,100,120,140,160].map(m=>{const v=r(m),h=m===140;return`
      <line x1="45" y1="${v}" x2="535" y2="${v}" stroke="${h?"rgba(239, 68, 68, 0.4)":"rgba(255, 255, 255, 0.08)"}" stroke-dasharray="${h?"4 4":"none"}" />
      <text x="37" y="${v+4}" fill="rgba(255, 255, 255, 0.45)" font-size="10" text-anchor="end">${m}</text>
    `}).join(""),s=a.map((m,v)=>{const h=f(v),T=r(m.systolic),M=r(m.diastolic),S=m.date.slice(5);return`
      <!-- Date label on x-axis -->
      <text x="${h}" y="208" fill="rgba(255, 255, 255, 0.5)" font-size="10" text-anchor="middle">${S}</text>

      <!-- Systolic Point -->
      <circle cx="${h}" cy="${T}" r="5" fill="#f43f5e" stroke="#fff" stroke-width="2" class="chart-point">
        <title>Systolic: ${m.systolic} mmHg on ${m.date} (${m.time})</title>
      </circle>
      <text x="${h}" y="${T-8}" fill="#f43f5e" font-size="10" font-weight="600" text-anchor="middle">${m.systolic}</text>

      <!-- Diastolic Point -->
      <circle cx="${h}" cy="${M}" r="4.5" fill="#0284c7" stroke="#fff" stroke-width="2" class="chart-point">
        <title>Diastolic: ${m.diastolic} mmHg on ${m.date}</title>
      </circle>
      <text x="${h}" y="${M+14}" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">${m.diastolic}</text>
    `}).join("");return`
    <svg viewBox="0 0 560 220" class="vitals-svg" preserveAspectRatio="xMidYMid meet">
      <!-- Gradient fills -->
      <defs>
        <linearGradient id="sysGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${b}
      <!-- High BP warning guideline line -->
      <line x1="45" y1="${r(140)}" x2="535" y2="${r(140)}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="535" y="${r(140)-5}" fill="#ef4444" font-size="9" text-anchor="end">Hypertension Threshold (140)</text>

      <!-- Lines -->
      <polyline points="${A}" fill="none" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="${$}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${s}
    </svg>
  `}function z(a){const r=s=>185-(s-70)/130*155,f=s=>45+s/(a.length-1||1)*490,A=a.map((s,m)=>`${f(m)},${r(s.bloodSugar)}`).join(" "),$=[90,120,140,170].map(s=>{const m=r(s),v=s===140;return`
      <line x1="45" y1="${m}" x2="535" y2="${m}" stroke="${v?"rgba(245, 158, 11, 0.4)":"rgba(255, 255, 255, 0.08)"}" stroke-dasharray="${v?"4 4":"none"}" />
      <text x="37" y="${m+4}" fill="rgba(255, 255, 255, 0.45)" font-size="10" text-anchor="end">${s}</text>
    `}).join(""),b=a.map((s,m)=>{const v=f(m),h=r(s.bloodSugar),T=s.date.slice(5),M=s.bloodSugar>140;return`
      <text x="${v}" y="208" fill="rgba(255, 255, 255, 0.5)" font-size="10" text-anchor="middle">${T}</text>
      <circle cx="${v}" cy="${h}" r="5" fill="${M?"#f59e0b":"#10b981"}" stroke="#fff" stroke-width="2" class="chart-point">
        <title>${s.bloodSugar} mg/dL (${s.sugarType||"Recorded"}) on ${s.date}</title>
      </circle>
      <text x="${v}" y="${h-8}" fill="${M?"#f59e0b":"#10b981"}" font-size="10" font-weight="600" text-anchor="middle">${s.bloodSugar}</text>
    `}).join("");return`
    <svg viewBox="0 0 560 220" class="vitals-svg" preserveAspectRatio="xMidYMid meet">
      ${$}
      <line x1="45" y1="${r(140)}" x2="535" y2="${r(140)}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" />
      <text x="535" y="${r(140)-5}" fill="#f59e0b" font-size="9" text-anchor="end">Target Upper Limit (140)</text>

      <polyline points="${A}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      ${b}
    </svg>
  `}function q(a,t="all"){const e=document.getElementById(a);if(!e)return;const n=y.getState(),i=n.medications||[],d=t==="all"?i:i.filter(l=>l.slot.toLowerCase()===t.toLowerCase());if(d.length===0){e.innerHTML=`
      <div class="empty-state">
        <span class="empty-icon">💊</span>
        <p>No medications scheduled for ${t}.</p>
      </div>
    `;return}const g=n.uiMode==="senior",o=n.language==="hi",u=d.map(l=>{const c=l.takenToday,r=l.stock<=l.refillThreshold;return`
      <div class="med-card ${c?"med-taken":"med-pending"} ${g?"senior-med-card":""}" data-id="${l.id}">
        <div class="med-left">
          <div class="pill-badge" style="background-color: ${l.color}22; border-color: ${l.color}; color: ${l.color}">
            <span class="pill-shape pill-${l.shape}" style="background-color: ${l.color}"></span>
            <span class="pill-slot">${l.slot}</span>
          </div>

          <div class="med-info">
            <div class="med-title-row">
              <h3 class="med-name">${l.name}</h3>
              <span class="med-dose">${l.dosage}</span>
            </div>
            
            <p class="med-purpose">
              <span class="purpose-icon">🎯</span> ${l.purpose}
            </p>

            <div class="med-meta-tags">
              <span class="meta-tag timing-tag">
                ⏰ ${l.time}
              </span>
              <span class="meta-tag food-tag">
                🍽️ ${l.foodRelation}
              </span>
              ${r?`
                <span class="meta-tag low-stock-tag">
                  ⚠️ Stock: ${l.stock} left
                </span>
              `:`
                <span class="meta-tag stock-tag">
                  📦 In box: ${l.stock}
                </span>
              `}
            </div>

            ${l.instructions?`
              <p class="med-instructions">💡 ${l.instructions}</p>
            `:""}
          </div>
        </div>

        <div class="med-actions">
          <button class="voice-listen-btn" title="Listen instructions" data-speak-med="${l.id}">
            🔊
          </button>

          <button class="med-edit-btn" title="Edit medication" data-edit-med="${l.id}">
            ✏️
          </button>

          <button class="med-toggle-btn ${c?"btn-taken":"btn-take-now"}" data-toggle-med="${l.id}">
            ${c?`
              <span class="check-icon">✓</span>
              <span class="btn-text">${o?"ली गई":"Taken"} (${l.takenAt||"Today"})</span>
            `:`
              <span class="take-icon">○</span>
              <span class="btn-text">${o?"दवा ली":"Mark Taken"}</span>
            `}
          </button>
        </div>
      </div>
    `}).join("");e.innerHTML=u,e.querySelectorAll("[data-toggle-med]").forEach(l=>{l.addEventListener("click",c=>{c.stopPropagation();const r=l.getAttribute("data-toggle-med");y.toggleMedication(r),E.playSuccess()})}),e.querySelectorAll("[data-edit-med]").forEach(l=>{l.addEventListener("click",c=>{c.stopPropagation();const r=l.getAttribute("data-edit-med");window.openEditMedicationModal&&window.openEditMedicationModal(r)})}),e.querySelectorAll("[data-speak-med]").forEach(l=>{l.addEventListener("click",c=>{c.stopPropagation();const r=l.getAttribute("data-speak-med"),f=i.find(A=>A.id===r);if(f){const A=`${f.name}, ${f.dosage}. Scheduled for ${f.slot} at ${f.time}. Take ${f.foodRelation}. ${f.instructions||""}`,$=`${f.name}, मात्रा ${f.dosage}। ${f.slot} में ${f.time} बजे, ${f.foodRelation} लेनी है। ${f.purpose} के लिए।`;k.speak(A,$)}})})}function J(a){const t=document.getElementById(a);if(!t)return;const e=y.getState(),n=e.hydration,i=e.language==="hi",d=Math.min(100,Math.round(n.current/n.target*100));let g="";for(let l=1;l<=n.target;l++){const c=l<=n.current;g+=`
      <button class="glass-icon ${c?"filled":"empty"}" data-glass-idx="${l}" title="Glass ${l}">
        ${c?"💧":"🥛"}
      </button>
    `}t.innerHTML=`
    <div class="hydration-card">
      <div class="hyd-header">
        <div class="hyd-title-wrap">
          <span class="hyd-icon">💧</span>
          <div>
            <h4 class="hyd-title">${i?"दैनिक जल सेवन":"Daily Hydration Tracker"}</h4>
            <p class="hyd-sub">${n.current} of ${n.target} ${i?"गिलास पूरे":"Glasses Consumed"}</p>
          </div>
        </div>
        <div class="hyd-badge ${d>=100?"badge-goal-met":""}">
          ${d}% ${d>=100?"🎉 Goal Met!":""}
        </div>
      </div>

      <div class="hyd-progress-bar-bg">
        <div class="hyd-progress-bar-fill" style="width: ${d}%;"></div>
      </div>

      <div class="glasses-row">
        ${g}
      </div>

      <div class="hyd-actions-row">
        <button class="hyd-add-btn" id="btnAddWater">
          ➕ ${i?"1 गिलास पानी पिया":"+1 Glass of Water"}
        </button>
        <button class="hyd-reset-btn" id="btnResetWater" title="Reset counter">
          ↺
        </button>
      </div>
    </div>
  `;const o=t.querySelector("#btnAddWater");o&&o.addEventListener("click",()=>{y.addHydration(),E.playWater()});const u=t.querySelector("#btnResetWater");u&&u.addEventListener("click",()=>{confirm(i?"क्या आप पानी का काउंटर रीसेट करना चाहते हैं?":"Reset today's water counter?")&&y.resetHydration()})}function K(a){const t=document.getElementById(a);if(!t)return;const e=y.getState(),n=e.appointments||[];if(e.language,n.length===0){t.innerHTML='<div class="empty-state">No upcoming appointments scheduled.</div>';return}const i=n.map(d=>`
      <div class="apt-card">
        <div class="apt-date-badge">
          <span class="apt-calendar-icon">📅</span>
          <span class="apt-date-text">${d.date}</span>
          <span class="apt-time-text">${d.time}</span>
        </div>

        <div class="apt-details">
          <div class="apt-type-chip">${d.type}</div>
          <h4 class="apt-title">${d.title}</h4>
          <p class="apt-doctor">👨‍⚕️ ${d.doctor}</p>
          <p class="apt-hospital">🏥 ${d.hospital}</p>
          ${d.notes?`<p class="apt-notes">📝 ${d.notes}</p>`:""}
        </div>

        <div class="apt-action">
          <button class="apt-listen-btn" data-speak-apt="${d.id}" title="Read appointment details">
            🔊
          </button>
          <button class="apt-edit-btn" data-edit-apt="${d.id}" title="Edit appointment">
            ✏️
          </button>
        </div>
      </div>
    `).join("");t.innerHTML=i,t.querySelectorAll("[data-edit-apt]").forEach(d=>{d.addEventListener("click",()=>{const g=d.getAttribute("data-edit-apt");window.openEditAppointmentModal&&window.openEditAppointmentModal(g)})}),t.querySelectorAll("[data-speak-apt]").forEach(d=>{d.addEventListener("click",()=>{const g=d.getAttribute("data-speak-apt"),o=n.find(u=>u.id===g);if(o){const u=`Appointment for ${o.title} with ${o.doctor} on ${o.date} at ${o.time}. Location: ${o.hospital}. Note: ${o.notes||"None"}`,l=`${o.title} के लिए अपॉइंटमेंट ${o.doctor} के साथ ${o.date} को ${o.time} बजे है। स्थान: ${o.hospital}।`;k.speak(u,l)}})})}function X(a){const t=D(a),e=a.vitals||[],n=e[e.length-1]||{},i=a.language==="hi",d=a.user,g=a.medications,o=g.filter(r=>r.takenToday).length,u=g.filter(r=>!r.takenToday),l=`
    <strong>Daily Status for ${d.preferredName} (${d.name})</strong>:
    <br><br>
    • <strong>Medication Adherence</strong>: ${o} of ${g.length} doses taken (${t.adherencePercent}%). ${u.length>0?`Pending: ${u.map(r=>r.name).join(", ")}.`:"All doses completed!"}
    <br>
    • <strong>Vitals Snapshot</strong>: BP ${n.systolic}/${n.diastolic} mmHg, Pulse ${n.pulse} bpm, Blood Glucose ${n.bloodSugar} mg/dL (${n.sugarType}).
    <br>
    • <strong>Hydration & Routine</strong>: ${a.hydration.current} of ${a.hydration.target} glasses consumed. Mood logged as "${a.dailyCheckIn.mood||"Good"}".
    <br>
    • <strong>AI Pattern Insights</strong>: ${t.alerts.length>0?t.alerts[0].observation:"All patterns within baseline parameters."}
  `,c=`
    <strong>${d.preferredName} (${d.name}) का दैनिक स्वास्थ्य सारांश</strong>:
    <br><br>
    • <strong>दवाओं का विवरण</strong>: आज कुल ${g.length} में से ${o} दवाएं ली गईं (${t.adherencePercent}%)। ${u.length>0?`बाकी दवाएं: ${u.map(r=>r.name).join(", ")}।`:"सभी दवाएं समय पर ली गईं!"}
    <br>
    • <strong>स्वास्थ्य माप (Vitals)</strong>: बीपी ${n.systolic}/${n.diastolic} mmHg, पल्स ${n.pulse} bpm, शुगर ${n.bloodSugar} mg/dL।
    <br>
    • <strong>पानी और दिनचर्या</strong>: आज ${a.hydration.current} गिलास पानी पिया। मूड: "${a.dailyCheckIn.mood||"अच्छा"}"।
    <br>
    • <strong>एआई स्वास्थ्य विश्लेषण</strong>: ${t.alerts.length>0?t.alerts[0].observationHi||t.alerts[0].observation:"सभी स्वास्थ्य संकेत सामान्य स्थिति में हैं।"}
  `;return{html:i?c:l,plainText:O(i?c:l),analysis:t}}function O(a){const t=document.createElement("div");return t.innerHTML=a,t.textContent||t.innerText||""}function Q(){const a=y.getState(),t=document.getElementById("passportModal"),e=document.getElementById("passportContent");if(!t||!e)return;const n=D(a),i=a.user,d=a.vitals||[],g=a.medications||[];e.innerHTML=`
    <div class="passport-document" id="printablePassport">
      <div class="passport-header">
        <div class="passport-brand">
          <div class="passport-logo-icon">🌿</div>
          <div>
            <h2 class="passport-title">SAARTHI CLINICAL HEALTH PASSPORT</h2>
            <p class="passport-subtitle">Elderly Comprehensive Daily & Longitudinal Record</p>
          </div>
        </div>
        <div class="passport-timestamp">
          <span>Date Generated:</span>
          <strong>${new Date().toLocaleDateString("en-IN",{weekday:"short",year:"numeric",month:"short",day:"numeric"})}</strong>
        </div>
      </div>

      <div class="passport-patient-grid">
        <div class="p-card">
          <div class="p-label">PATIENT NAME</div>
          <div class="p-value">${i.name} (${i.preferredName})</div>
        </div>
        <div class="p-card">
          <div class="p-label">AGE / GENDER</div>
          <div class="p-value">${i.age} Years / ${i.gender}</div>
        </div>
        <div class="p-card">
          <div class="p-label">BLOOD GROUP</div>
          <div class="p-value">${i.bloodGroup}</div>
        </div>
        <div class="p-card">
          <div class="p-label">PRIMARY CAREGIVER</div>
          <div class="p-value">${i.caregiver.name} (${i.caregiver.relation})<br>${i.caregiver.phone}</div>
        </div>
        <div class="p-card">
          <div class="p-label">TREATING PHYSICIAN</div>
          <div class="p-value">${i.doctor.name} (${i.doctor.specialty})<br>${i.doctor.hospital}</div>
        </div>
        <div class="p-card">
          <div class="p-label">HEALTH SCORE INDEX</div>
          <div class="p-value" style="color: ${n.overallHealthIndex.color}">
            <strong>${n.overallHealthIndex.score} / 100</strong> (${n.overallHealthIndex.status})
          </div>
        </div>
      </div>

      <div class="passport-section">
        <h3 class="p-sec-title">1. CURRENT ACTIVE MEDICATIONS & SCHEDULE</h3>
        <table class="passport-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Slot & Time</th>
              <th>Relation to Food</th>
              <th>Indication</th>
              <th>Today Status</th>
            </tr>
          </thead>
          <tbody>
            ${g.map(o=>`
              <tr>
                <td><strong>${o.name}</strong></td>
                <td>${o.dosage}</td>
                <td>${o.slot} (${o.time})</td>
                <td>${o.foodRelation}</td>
                <td>${o.purpose}</td>
                <td><span class="status-badge ${o.takenToday?"taken":"pending"}">${o.takenToday?"Taken":"Pending"}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="passport-section">
        <h3 class="p-sec-title">2. VITALS LONGITUDINAL RECORD (LAST 7 DAYS)</h3>
        <table class="passport-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Pressure (mmHg)</th>
              <th>Pulse (bpm)</th>
              <th>Blood Sugar (mg/dL)</th>
              <th>SpO2</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            ${d.slice(-7).reverse().map(o=>`
              <tr>
                <td>${o.date}</td>
                <td>${o.time}</td>
                <td><strong style="color: ${o.systolic>=140?"#ef4444":"inherit"}">${o.systolic}/${o.diastolic}</strong></td>
                <td>${o.pulse}</td>
                <td>${o.bloodSugar} (${o.sugarType})</td>
                <td>${o.spo2}%</td>
                <td>${o.weight} kg</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="passport-section">
        <h3 class="p-sec-title">3. AI PATTERN ANOMALIES & CLINICAL HIGHLIGHTS</h3>
        <div class="passport-ai-box">
          ${n.alerts.map(o=>`
            <div class="p-alert-item ${o.severity}">
              <strong>[${o.category.toUpperCase()}] ${o.title}</strong>: ${o.observation}
              <div class="p-rec"><em>AI Clinical Note:</em> ${o.aiDiagnosis} | <strong>Recommendation:</strong> ${o.actionRequired}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="passport-footer">
        <p>Saarthi AI Telehealth Record System • Designed for elderly care and family peace of mind • Confidential Medical Summary</p>
      </div>
    </div>
  `,t.classList.add("active")}function Z(){const a=y.getState(),t=D(a),e=a.vitals||[],n=e[e.length-1]||{},i=a.user,d=i.caregiver.whatsapp.replace(/[^0-9]/g,""),g=`🌿 *SAARTHI DAILY HEALTH UPDATE for ${i.name} (${i.preferredName})* 🌿
📅 Date: ${new Date().toLocaleDateString("en-IN")}

💊 *Medications*: ${t.takenMeds}/${t.totalMeds} taken today (${t.adherencePercent}% adherence)
🩺 *Latest Vitals*:
• Blood Pressure: ${n.systolic}/${n.diastolic} mmHg
• Pulse: ${n.pulse} bpm
• Blood Glucose: ${n.bloodSugar} mg/dL (${n.sugarType})
💧 *Hydration*: ${a.hydration.current}/8 glasses completed

⚠️ *AI Clinical Insight*:
${t.alerts.length>0?`• ${t.alerts[0].title}: ${t.alerts[0].observation}`:"• All health parameters stable today!"}

✨ Health Index: *${t.overallHealthIndex.score}/100 (${t.overallHealthIndex.status})*
_Generated via Saarthi Elderly Care AI Assistant_`,o=`https://wa.me/${d}?text=${encodeURIComponent(g)}`;window.open(o,"_blank")}const x=[{id:"scan-metformin",label:"Metformin 500mg Tablet Strip",imageUrl:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80",extracted:{brandName:"Glycomet-500",genericName:"Metformin Hydrochloride",dosage:"500 mg",slot:"Morning",frequency:"Twice daily after meals",purpose:"Type 2 Diabetes / Blood Glucose Regulator",manufacturer:"USV Pharma",expiryDate:"11/2027",color:"#fb923c",shape:"capsule",interactionWarning:null}},{id:"scan-aspirin",label:"Eco-Aspirin 75mg Strip",imageUrl:"https://images.unsplash.com/photo-1550572017-edb79a613256?w=500&auto=format&fit=crop&q=80",extracted:{brandName:"Ecosprin 75",genericName:"Acetylsalicylic Acid",dosage:"75 mg",slot:"Afternoon",frequency:"Once daily post-lunch",purpose:"Anti-platelet Blood Thinner / Cardioprotection",manufacturer:"USV Pvt Ltd",expiryDate:"08/2026",color:"#ec4899",shape:"circle",interactionWarning:null}},{id:"scan-ibuprofen-danger",label:"Brufen 400mg (Drug Interaction Alert Demo!)",imageUrl:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80",extracted:{brandName:"Brufen 400",genericName:"Ibuprofen",dosage:"400 mg",slot:"Night",frequency:"As needed for pain",purpose:"NSAID Pain Reliever & Anti-inflammatory",manufacturer:"Abbott Healthcare",expiryDate:"05/2026",color:"#ef4444",shape:"oval",interactionWarning:{severity:"CRITICAL",conflictingMed:"Eco-Aspirin 75mg",risk:"Severe GI bleeding & blunted cardioprotective antiplatelet effect when Ibuprofen is combined with daily Aspirin.",action:"Do not take concurrently. Consider Paracetamol / consult Dr. Banerjee."}}},{id:"scan-rx-prescription",label:"Dr. Banerjee Handwritten Rx Prescription Slip",imageUrl:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=80",extracted:{brandName:"Telmisartan 40mg",genericName:"Telmisartan",dosage:"40 mg",slot:"Morning",frequency:"Once daily before breakfast",purpose:"Angiotensin Receptor Blocker (Hypertension)",manufacturer:"Glenmark",expiryDate:"03/2028",color:"#6366f1",shape:"circle",interactionWarning:null}}];function ee(){const a=document.getElementById("pillScannerModal"),t=document.getElementById("btnOpenScanner"),e=document.getElementById("btnCloseScanner"),n=document.getElementById("scanPresetSelect"),i=document.getElementById("scanRadar"),d=document.getElementById("scanPreviewImg"),g=document.getElementById("scanStatusText"),o=document.getElementById("scanResultsArea"),u=document.getElementById("btnStartScan"),l=document.getElementById("pillUploadInput");if(!a)return;const c=()=>{a.classList.add("active"),A(x[0])},r=()=>{a.classList.remove("active")};t&&t.addEventListener("click",c),e&&e.addEventListener("click",r),a.addEventListener("click",s=>{s.target===a&&r()});let f=x[0];function A(s){f=s,d.src=s.imageUrl,o.innerHTML=`
      <div class="scan-placeholder-msg">
        <p>Click <strong>"Start AI Scan"</strong> to analyze medication strip, dosage, and interaction safety.</p>
      </div>
    `,g.textContent=`Ready to scan: ${s.label}`}n&&(n.innerHTML=x.map(s=>`
      <option value="${s.id}">${s.label}</option>
    `).join(""),n.addEventListener("change",s=>{const m=x.find(v=>v.id===s.target.value);m&&A(m)})),l&&l.addEventListener("change",s=>{const m=s.target.files[0];if(m){const v=new FileReader;v.onload=h=>{d.src=h.target.result,f={id:"custom-upload",label:"User Uploaded Medication",imageUrl:h.target.result,extracted:{brandName:"Metoprolol Succinate",genericName:"Metoprolol ER",dosage:"25 mg",slot:"Morning",frequency:"Once daily with food",purpose:"Beta-blocker for Heart Rate & Blood Pressure",manufacturer:"Sun Pharma",expiryDate:"10/2027",color:"#3b82f6",shape:"circle",interactionWarning:null}},g.textContent="Custom image loaded. Ready to scan.",o.innerHTML='<p class="scan-placeholder-msg">Click "Start AI Scan" to process custom image.</p>'},v.readAsDataURL(m)}}),u&&u.addEventListener("click",()=>{$()});function $(){i.classList.add("scanning"),u.disabled=!0,g.textContent="🔍 AI Neural Engine analyzing packaging, text OCR & batch markers...",E.playReminder(),setTimeout(()=>{g.textContent="🧪 Cross-referencing active medications for Drug-Drug Interactions (DDI)..."},1200),setTimeout(()=>{i.classList.remove("scanning"),u.disabled=!1,b(f.extracted)},2400)}function b(s){E.playSuccess();const m=s.interactionWarning!==null,v=y.getState().language==="hi";let h="";m?h=`
        <div class="interaction-alert-card critical-alert">
          <div class="interaction-header">
            <span class="danger-icon">🚨</span>
            <div>
              <h4 class="danger-title">${s.interactionWarning.severity}: Potential Drug Interaction!</h4>
              <p class="conflict-subtitle">Conflicts with currently active: <strong>${s.interactionWarning.conflictingMed}</strong></p>
            </div>
          </div>
          <p class="danger-desc">${s.interactionWarning.risk}</p>
          <div class="danger-recommendation">
            <strong>⚠️ Clinical Recommendation:</strong> ${s.interactionWarning.action}
          </div>
        </div>
      `:h=`
        <div class="interaction-alert-card safe-alert">
          <div class="interaction-header">
            <span class="safe-icon">✅</span>
            <div>
              <h4 class="safe-title">Safe To Use - No Adverse Interactions</h4>
              <p class="safe-subtitle">Cross-referenced against Dadaji's active 5 medications.</p>
            </div>
          </div>
        </div>
      `,o.innerHTML=`
      <div class="scan-extracted-card">
        ${h}

        <div class="extracted-details-grid">
          <div class="detail-row">
            <span class="detail-lbl">Brand / Trade Name:</span>
            <span class="detail-val highlight">${s.brandName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Active Generic Salt:</span>
            <span class="detail-val">${s.genericName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Extracted Dosage:</span>
            <span class="detail-val dose-chip">${s.dosage}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Prescribed Timing:</span>
            <span class="detail-val">${s.slot} (${s.frequency})</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Health Purpose:</span>
            <span class="detail-val">${s.purpose}</span>
          </div>
          <div class="detail-row">
            <span class="detail-lbl">Manufacturer & Expiry:</span>
            <span class="detail-val">${s.manufacturer} | Exp: ${s.expiryDate}</span>
          </div>
        </div>

        <div class="scan-actions-footer">
          <button class="voice-scan-speak-btn" id="btnSpeakScanResult">
            🔊 ${v?"विवरण सुनें":"Listen Summary"}
          </button>
          <button class="add-to-schedule-btn" id="btnAddScannedMed" ${m?"disabled":""}>
            ${m?"⚠️ Add Blocked (Safety Risk)":"➕ Add to Saarthi Schedule"}
          </button>
        </div>
      </div>
    `,g.textContent="AI Analysis Completed Successfully!";const T=document.getElementById("btnSpeakScanResult");T&&T.addEventListener("click",()=>{if(m){const S=`Warning! Detected ${s.brandName}, but it has a dangerous drug interaction with your ${s.interactionWarning.conflictingMed}. Do not take this without doctor approval.`,I=`सावधान! ${s.brandName} आपकी मौजूदा दवा ${s.interactionWarning.conflictingMed} के साथ खतरनाक असर कर सकती है। कृपया डॉक्टर से पूछे बिना इसे न लें।`;k.speak(S,I)}else{const S=`Identified ${s.brandName} ${s.dosage}, ${s.purpose}. Safe to take as per schedule.`,I=`पहचान की गई: ${s.brandName} ${s.dosage}। यह आपकी बाकी दवाओं के साथ सुरक्षित है।`;k.speak(S,I)}});const M=document.getElementById("btnAddScannedMed");M&&!m&&M.addEventListener("click",()=>{y.addMedication({name:s.brandName,dosage:s.dosage,slot:s.slot,time:s.slot==="Morning"?"08:30 AM":"08:30 PM",foodRelation:"After Food",shape:s.shape,color:s.color,purpose:s.purpose,stock:30,refillThreshold:7,instructions:`Scanned via AI Vision. Salt: ${s.genericName}`}),E.playSuccess(),alert(`Success! "${s.brandName}" added to Dadaji's daily schedule.`),r()})}}let C=null,R=null,B=5;function te(){const a=document.getElementById("sosModal"),t=document.getElementById("btnTriggerSOS"),e=document.getElementById("btnSeniorSOS"),n=document.getElementById("btnCancelSOS"),i=document.getElementById("btnStopSiren"),d=document.getElementById("sosCountdownNum"),g=document.getElementById("sosCountdownPhase"),o=document.getElementById("sosTriggeredPhase"),u=document.getElementById("btnSendSOSWhatsApp");if(!a)return;function l(){a.classList.add("active"),g.style.display="block",o.style.display="none",B=5,d.textContent=B,E.playTick(),y.getState().language,k.speak("Emergency SOS initiating in 5 seconds. Press cancel if this was a mistake.","आपातकालीन एसओएस 5 सेकंड में शुरू हो रहा है। अगर यह गलती से दबा है तो रद्द करें।"),clearInterval(C),C=setInterval(()=>{B--,B>0?(d.textContent=B,E.playTick()):(clearInterval(C),r())},1e3)}function c(){clearInterval(C),clearInterval(R),a.classList.remove("active"),y.getState().language,k.speak("Emergency SOS cancelled.","एसओएस रद्द कर दिया गया है।")}function r(){g.style.display="none",o.style.display="block",E.playAlarm(),R=setInterval(()=>{E.playAlarm()},1200),y.getState().language,k.speak("Emergency beacon activated! Family and doctors are being alerted now.","आपातकालीन अलार्म सक्रिय हो गया है! परिवार और डॉक्टर को सूचना भेजी जा रही है।")}function f(){clearInterval(R),a.classList.remove("active")}t&&t.addEventListener("click",l),e&&e.addEventListener("click",l),n&&n.addEventListener("click",c),i&&i.addEventListener("click",f),window.addEventListener("saarthi-trigger-sos",()=>{l()}),u&&u.addEventListener("click",()=>{const $=y.getState().user,b=$.caregiver.whatsapp.replace(/[^0-9]/g,""),v=`🚨🚨 *EMERGENCY SOS ALERT FROM SAARTHI* 🚨🚨
Patient: *${$.name} (${$.preferredName})*
Age: ${$.age} | Blood: ${$.bloodGroup}

Dadaji has pressed the emergency SOS distress beacon!
Immediate phone call or assistance required.

📍 *Live Location*:
https://maps.google.com/?q=${28.6139},${77.209}

Treating Doctor: ${$.doctor.name} (${$.doctor.phone})`;window.open(`https://wa.me/${b}?text=${encodeURIComponent(v)}`,"_blank")})}const G=[{name:"Ramesh Chandra Sharma",preferredName:"Dadaji",email:"ramesh.sharma74@gmail.com",role:"senior",age:74,gender:"Male",bloodGroup:"B+",avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",badge:"Senior Patient"},{name:"Ananya Sharma Verma",preferredName:"Ananya (Daughter)",email:"ananya.verma@gmail.com",role:"caregiver",age:42,gender:"Female",bloodGroup:"O+",avatar:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",badge:"Primary Caregiver"},{name:"Dr. A. K. Banerjee",preferredName:"Dr. Banerjee",email:"dr.banerjee.cardio@gmail.com",role:"caregiver",age:58,gender:"Male",bloodGroup:"A+",avatar:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",badge:"Visiting Cardiologist"}];function ne(){const a=document.getElementById("googleLoginModal"),t=document.getElementById("btnOpenLogin"),e=document.getElementById("btnCloseLogin"),n=document.getElementById("googleAccountsList"),i=document.getElementById("btnCustomGoogleLogin"),d=document.getElementById("customGoogleName"),g=document.getElementById("customGoogleEmail"),o=document.getElementById("customGoogleRole"),u=document.getElementById("userProfileBtn");if(!a)return;function l(){n&&(n.innerHTML=G.map(r=>`
      <div class="google-acc-item" data-acc-email="${r.email}">
        <img src="${r.avatar}" alt="${r.name}" class="google-acc-avatar" />
        <div class="google-acc-info">
          <div class="google-acc-name">${r.name}</div>
          <div class="google-acc-email">${r.email}</div>
        </div>
        <span class="google-acc-badge ${r.role}">${r.badge}</span>
      </div>
    `).join(""),n.querySelectorAll(".google-acc-item").forEach(r=>{r.addEventListener("click",()=>{const f=r.getAttribute("data-acc-email"),A=G.find($=>$.email===f);A&&c(A)})}))}function c(r){E.playSuccess(),y.setUser({name:r.name,preferredName:r.preferredName,email:r.email,role:r.role,age:r.age||74,gender:r.gender||"Male",bloodGroup:r.bloodGroup||"B+",avatar:r.avatar}),r.role==="caregiver"?y.switchMode("caregiver"):y.switchMode("senior"),a.classList.remove("active"),y.getState().language;const f=`Welcome back, ${r.preferredName}! Google account synced successfully.`,A=`स्वागत है, ${r.preferredName}! गूगल खाता सफलतापूर्वक लिंक हो गया है।`;k.speak(f,A)}t&&t.addEventListener("click",()=>{l(),a.classList.add("active")}),u&&u.addEventListener("click",()=>{l(),a.classList.add("active")}),e&&e.addEventListener("click",()=>{a.classList.remove("active")}),a.addEventListener("click",r=>{r.target===a&&a.classList.remove("active")}),i&&i.addEventListener("click",()=>{const r=d.value.trim()||"Guest User",f=g.value.trim()||"user@gmail.com",A=o.value||"senior";c({name:r,preferredName:r.split(" ")[0],email:f,role:A,age:70,gender:"Prefer not to say",bloodGroup:"O+",avatar:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r)}&backgroundColor=0284c7`})}),l()}const P={en:{brandTitle:"SAARTHI",brandDevanagari:"सारथी",brandTagline:"Elderly Care & Daily Health Assistant AI",modeSenior:"👵 Saral Mode (Easy)",modeCaregiver:"👩‍⚕️ Caregiver View",pillScanNav:"📸 AI Pill Scan",passportNav:"📋 Health Passport",seniorRole:"Senior User",caregiverRole:"Caregiver / Doctor",themeToggleText:"Theme",themeDark:"Dark Mode",themeLight:"Light Mode",langEnglish:"English",langHindi:"हिन्दी",voiceHeroTitle:"Suno Saarthi (AI Voice Assistant)",voiceHeroSubDefault:'Speak naturally: "Maine BP ki goli le li" or "Log blood pressure 130 85"',voiceHeroListening:"🎙️ Listening... Speak naturally now",voiceHeroSpeaking:"🔊 Saarthi is speaking...",voiceBtnTalk:"Tap to Talk",sosBtn:"🚨 SOS HELP",summaryTitle:"Daily Health Summary & Caregiver Digest",listenSummaryBtn:"🔊 Listen Summary",whatsappDigestBtn:"💬 WhatsApp Caregiver",metricAdherence:"Medicine Adherence",metricAdherenceSub:"doses taken today",metricBP:"Latest Blood Pressure",metricBPSubHigh:"⚠️ Elevated Systolic",metricBPSubNormal:"✓ Healthy Baseline",metricSugar:"Blood Glucose",metricSugarSub:"✓ Normal Baseline",metricIndex:"AI Health Index",medsTitle:"Today's Medicines & Schedule",medsSub:"Tap once when you take your medicine",slotAll:"All Day",slotMorning:"Morning",slotAfternoon:"Afternoon",slotNight:"Night",btnMarkTaken:"Mark Taken",btnTaken:"Taken",inBox:"In box:",lowStock:"Stock low:",listenCard:"Listen",hydTitle:"Daily Hydration Tracker",hydSub:"Glasses Consumed",hydAddBtn:"➕ 1 Glass of Water",hydGoalMet:"🎉 Goal Met!",wellnessTitle:"Daily Wellness & Mood (How are you feeling today?)",wellnessSub:"One-tap mood log & gentle cognitive check-in",moodGreat:"Great",moodGood:"Good",moodOkay:"Okay",moodTired:"Tired",moodUnwell:"Unwell",routineTitle:"Daily Routine & Gentle Activities",routineSub:"Light walk, breathing exercises, and sun exposure",actDone:"Done ✓",actMarkDone:"Mark Done",aiPatternsTitle:"AI Pattern Anomaly Detector",aiPatternsSub:"Surfaces clinical trends, drug risks & vitals correlations",aiBadgeText:"Neural Health Engine",listenAlert:"🔊 Listen",observationLbl:"Observation:",diagnosisLbl:"AI Clinical Inference:",actionLbl:"Recommended Action:",vitalsTitle:"Vitals Longitudinal Trends",vitalsSub:"Interactive 7-day Blood Pressure & Glucose tracking",logNewVitalsBtn:"➕ Log New Vitals",appointmentsTitle:"Doctor Visits & Care Appointments",appointmentsSub:"Upcoming consultations, labs & home therapy",vitalsModalTitle:"Log New Health Vitals",presetsTitle:"⚡ Quick Demo Presets for Hackathon Judges:",presetNormal:"🟢 Normal (120/80)",presetHighBP:"🚨 High BP Spike (162/98)",presetHighSugar:"⚠️ Sugar Spike (185 mg/dL)",saveVitalsBtn:"💾 Save Vitals & Run AI Pattern Analysis",scannerTitle:"AI Vision Pill & Rx Scanner",scannerSub:"Optical text extraction & Drug-Drug Interaction safety analysis",presetsLabel:"Demo Presets:",uploadBtn:"📁 Upload Photo",startScanBtn:"🔍 Start AI Scan",sosTitle:"🚨 EMERGENCY BEACON",sosSub:"Alerting Daughter Ananya, Doctor Banerjee & Dispatching GPS coordinates in:",sosCancelBtn:"🛑 CANCEL (FALSE ALARM)",sosActiveTitle:"🚨 SOS DISTRESS ACTIVATED!",sosCallAmbulance:"📞 Call 112 / 108",sosCallDaughter:"📞 Call Daughter Ananya",sosSendWhatsApp:"💬 Send SOS WhatsApp with Live GPS Pin",sosSilence:"Silence Siren & Close",footerText:"SAARTHI AI • Built for Elderly Care, Accessibility & Family Peace of Mind",resetDataBtn:"↺ Reset Demo Data",btnEdit:"✏️ Edit",btnAddMed:"➕ Add Medicine",btnAddApt:"➕ Add Appointment",btnAddAct:"➕ Add Activity",modalEditMedTitle:"Edit Medication Details",modalAddMedTitle:"Add New Medication",modalEditAptTitle:"Edit Doctor Appointment",modalAddAptTitle:"Add Doctor Appointment",modalEditActTitle:"Edit Routine Activity",modalAddActTitle:"Add Daily Routine Activity",btnSave:"💾 Save Changes",btnDelete:"🗑️ Delete Item",confirmDelete:"Are you sure you want to delete this item?"},hi:{brandTitle:"SAARTHI",brandDevanagari:"सारथी",brandTagline:"वरिष्ठ नागरिक देखभाल एवं दैनिक स्वास्थ्य सहायक AI",modeSenior:"👵 सरल मोड (आसान)",modeCaregiver:"👩‍⚕️ केयरगिवर / डॉक्टर दृश्य",pillScanNav:"📸 एआई गोली स्कैनर",passportNav:"📋 स्वास्थ्य पासपोर्ट",seniorRole:"वरिष्ठ सदस्य",caregiverRole:"केयरगिवर / डॉक्टर",themeToggleText:"थीम",themeDark:"डार्क मोड",themeLight:"लाइट मोड",langEnglish:"English",langHindi:"हिन्दी",voiceHeroTitle:"सुनो सारथी (वॉयस असिस्टेंट)",voiceHeroSubDefault:'स्वाभाविक रूप से बोलें: "मैंने बीपी की गोली ले ली" या "मेरा बीपी 130 85 है"',voiceHeroListening:"🎙️ सुन रहा हूँ... अब अपनी बात कहें",voiceHeroSpeaking:"🔊 सारथी बोल रहा है...",voiceBtnTalk:"बोलने के लिए दबाएं",sosBtn:"🚨 आपातकालीन मदद (SOS)",summaryTitle:"दैनिक स्वास्थ्य सारांश एवं केयरगिवर रिपोर्ट",listenSummaryBtn:"🔊 सारांश सुनें",whatsappDigestBtn:"💬 केयरगिवर को व्हाट्सएप भेजें",metricAdherence:"दवाओं की नियमितता",metricAdherenceSub:"खुराक आज ली गईं",metricBP:"ताज़ा रक्तचाप (BP)",metricBPSubHigh:"⚠️ बढ़ा हुआ सिस्टोलिक बीपी",metricBPSubNormal:"✓ सामान्य संतुलित",metricSugar:"ब्लड ग्लूकोज (शुगर)",metricSugarSub:"✓ सामान्य फास्टिंग",metricIndex:"एआई स्वास्थ्य सूचकांक",medsTitle:"आज की दवाएं और समय सारणी",medsSub:"दवा लेने के बाद एक बार दबाकर दर्ज करें",slotAll:"पूरा दिन",slotMorning:"सुबह",slotAfternoon:"दोपहर",slotNight:"रात",btnMarkTaken:"दवा ली",btnTaken:"ली गई",inBox:"दवा बची है:",lowStock:"कम बची है:",listenCard:"सुनें",hydTitle:"दैनिक जल सेवन ट्रैकर",hydSub:"गिलास पानी पूरा",hydAddBtn:"➕ 1 गिलास पानी पिया",hydGoalMet:"🎉 लक्ष्य पूरा हुआ!",wellnessTitle:"दैनिक स्वास्थ्य एवं मूड (आज कैसा महसूस कर रहे हैं?)",wellnessSub:"एक टैप में मूड दर्ज करें और हालचाल बताएं",moodGreat:"उत्कृष्ट",moodGood:"अच्छा",moodOkay:"सामान्य",moodTired:"थकावट",moodUnwell:"अस्वस्थ",routineTitle:"दैनिक दिनचर्या और हल्का व्यायाम",routineSub:"टहलना, प्राणायाम, धूप लेना और डॉक्टर द्वारा बताए गए व्यायाम",actDone:"हो गया ✓",actMarkDone:"पूरा किया",aiPatternsTitle:"एआई स्वास्थ्य पैटर्न व असामान्यता पहचान",aiPatternsSub:"रक्तचाप में उतार-चढ़ाव, दवा के प्रभाव और जोखिम की पहचान",aiBadgeText:"न्यूरल हेल्थ इंजन",listenAlert:"🔊 सुनें",observationLbl:"निरीक्षण:",diagnosisLbl:"एआई चिकित्सीय निष्कर्ष:",actionLbl:"सुझाया गया कदम:",vitalsTitle:"स्वास्थ्य माप के 7-दिवसीय रुझान",vitalsSub:"इंटरैक्टिव ब्लड प्रेशर एवं ग्लूकोज ग्राफ",logNewVitalsBtn:"➕ नया स्वास्थ्य माप दर्ज करें",appointmentsTitle:"डॉक्टर परामर्श एवं आगामी अपॉइंटमेंट",appointmentsSub:"अस्पताल जांच, लैब टेस्ट एवं थेरेपी",vitalsModalTitle:"नया स्वास्थ्य माप दर्ज करें",presetsTitle:"⚡ जजों के लिए डेमो प्रीसेट:",presetNormal:"🟢 सामान्य (120/80)",presetHighBP:"🚨 हाई बीपी स्पाइक (162/98)",presetHighSugar:"⚠️ शुगर स्पाइक (185 mg/dL)",saveVitalsBtn:"💾 माप सहेजें और एआई विश्लेषण चलाएं",scannerTitle:"एआई विज़न गोली एवं पर्चा स्कैनर",scannerSub:"कैमरे से दवा का नाम, मात्रा व दवाओं के आपस में दुष्प्रभाव की जांच",presetsLabel:"डेमो प्रीसेट:",uploadBtn:"📁 फोटो अपलोड करें",startScanBtn:"🔍 एआई स्कैन शुरू करें",sosTitle:"🚨 आपातकालीन अलार्म (SOS)",sosSub:"बेटी अनन्या, डॉ. बनर्जी को सूचना एवं जीपीएस स्थान भेजा जा रहा है:",sosCancelBtn:"🛑 रद्द करें (गलती से दबा)",sosActiveTitle:"🚨 आपातकालीन सहायता सक्रिय!",sosCallAmbulance:"📞 112 / 108 पर कॉल करें",sosCallDaughter:"📞 बेटी अनन्या को कॉल करें",sosSendWhatsApp:"💬 व्हाट्सएप पर आपात संदेश व लोकेशन भेजें",sosSilence:"अलार्म बंद करें और वापस जाएं",footerText:"सारथी एआई • बुजुर्गों की देखभाल, सुगमता और परिवार की मानसिक शांति के लिए समर्पित",resetDataBtn:"↺ डेमो डेटा रीसेट करें",btnEdit:"✏️ संपादन",btnAddMed:"➕ नई दवा जोड़ें",btnAddApt:"➕ नया अपॉइंटमेंट",btnAddAct:"➕ नई गतिविधि",modalEditMedTitle:"दवा विवरण संपादित करें",modalAddMedTitle:"नई दवा जोड़ें",modalEditAptTitle:"डॉक्टर अपॉइंटमेंट संपादित करें",modalAddAptTitle:"नया डॉक्टर अपॉइंटमेंट जोड़ें",modalEditActTitle:"दिनचर्या गतिविधि संपादित करें",modalAddActTitle:"नई दिनचर्या गतिविधि जोड़ें",btnSave:"💾 बदलाव सहेजें",btnDelete:"🗑️ हटाएं",confirmDelete:"क्या आप वाकई इसे हटाना चाहते हैं?"}};function p(a,t="hi"){return(P[t]||P.en)[a]||P.en[a]||a}let N="all";document.addEventListener("DOMContentLoaded",()=>{ne(),ee(),te(),le(),ie(),V(),y.subscribe((a,t,e)=>{console.log("State updated:",t,e),V()}),k.onStateChange=({isListening:a,isSpeaking:t})=>{const e=document.getElementById("btnVoiceAssistant"),n=document.getElementById("voiceOrb"),i=document.getElementById("voiceStatusText"),d=y.getState().language;e&&(a?(e.classList.add("listening"),n&&n.classList.add("pulsing"),i&&(i.textContent=p("voiceHeroListening",d))):t?(e.classList.add("speaking"),n&&n.classList.add("speaking-orb"),i&&(i.textContent=p("voiceHeroSpeaking",d))):(e.classList.remove("listening","speaking"),n&&n.classList.remove("pulsing","speaking-orb"),i&&(i.textContent=p("voiceHeroSubDefault",d))))}});function ie(){const a=document.getElementById("btnVoiceAssistant");a&&a.addEventListener("click",()=>{k.toggleListening()});const t=document.getElementById("btnModeSenior"),e=document.getElementById("btnModeCaregiver");t&&e&&(t.addEventListener("click",()=>{y.switchMode("senior"),E.playReminder()}),e.addEventListener("click",()=>{y.switchMode("caregiver"),E.playReminder()}));const n=document.getElementById("btnThemeDark"),i=document.getElementById("btnThemeLight");n&&n.addEventListener("click",()=>{y.setTheme("dark"),E.playReminder()}),i&&i.addEventListener("click",()=>{y.setTheme("light"),E.playReminder()});const d=document.getElementById("btnLangEn"),g=document.getElementById("btnLangHi");d&&d.addEventListener("click",()=>{y.setLanguage("en"),E.playReminder(),k.speak("English language selected.","English language selected.")}),g&&g.addEventListener("click",()=>{y.setLanguage("hi"),E.playReminder(),k.speak("हिंदी भाषा चुनी गई है।","हिंदी भाषा चुनी गई है।")});const o=document.getElementById("btnOpenPassport"),u=document.getElementById("btnClosePassport"),l=document.getElementById("btnPrintPassport");o&&o.addEventListener("click",()=>{Q()}),u&&u.addEventListener("click",()=>{const s=document.getElementById("passportModal");s&&s.classList.remove("active")}),l&&l.addEventListener("click",()=>{window.print()});const c=document.getElementById("btnSendWhatsAppDigest");c&&c.addEventListener("click",()=>{Z()}),document.querySelectorAll(".slot-tab").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".slot-tab").forEach(m=>m.classList.remove("active")),s.classList.add("active"),N=s.getAttribute("data-slot")||"all",q("medsListContainer",N),E.playReminder()})});const r=document.getElementById("btnOpenAddVitals"),f=document.getElementById("btnCloseAddVitals"),A=document.getElementById("vitalsModal"),$=document.getElementById("vitalsForm");r&&A&&r.addEventListener("click",()=>{A.classList.add("active")}),f&&A&&f.addEventListener("click",()=>{A.classList.remove("active")}),document.querySelectorAll(".vital-preset-btn").forEach(s=>{s.addEventListener("click",()=>{const m=s.getAttribute("data-sys"),v=s.getAttribute("data-dia"),h=s.getAttribute("data-pulse"),T=s.getAttribute("data-sugar");m&&(document.getElementById("inputSystolic").value=m),v&&(document.getElementById("inputDiastolic").value=v),h&&(document.getElementById("inputPulse").value=h),T&&(document.getElementById("inputSugar").value=T)})}),$&&$.addEventListener("submit",s=>{s.preventDefault();const m=parseInt(document.getElementById("inputSystolic").value,10),v=parseInt(document.getElementById("inputDiastolic").value,10),h=parseInt(document.getElementById("inputPulse").value,10)||75,T=parseInt(document.getElementById("inputSugar").value,10)||120,M=document.getElementById("inputSugarType").value||"Fasting",S=parseInt(document.getElementById("inputSpo2").value,10)||98,I=parseFloat(document.getElementById("inputWeight").value)||68.4;y.addVitals({systolic:m,diastolic:v,pulse:h,bloodSugar:T,sugarType:M,spo2:S,weight:I}),E.playSuccess(),A.classList.remove("active"),y.getState().language;const L=`Recorded blood pressure ${m} over ${v} mmHg. AI Pattern analysis updated.`,w=`ब्लड प्रेशर ${m} और ${v} दर्ज किया गया। स्वास्थ्य विश्लेषण अपडेट हुआ।`;k.speak(L,w)}),document.querySelectorAll(".mood-btn").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".mood-btn").forEach(T=>T.classList.remove("selected")),s.classList.add("selected");const m=s.getAttribute("data-mood");y.setMood(m),E.playSuccess(),y.getState().language;const v={great:{en:"Wonderful to hear you're feeling great today!",hi:"सुनकर बहुत खुशी हुई कि आप बहुत अच्छा महसूस कर रहे हैं!"},good:{en:"Glad you are feeling good today, Dadaji.",hi:"बहुत अच्छा दादाजी, अपना ख्याल रखें।"},okay:{en:"Take it easy today and drink plenty of water.",hi:"आज आराम से रहें और थोड़ा पानी पिएं।"},tired:{en:"Please rest a bit. Have you had your afternoon tea?",hi:"कृपया थोड़ा आराम कर लीजिए दादाजी।"},unwell:{en:"I'm alerting Ananya so she can check in on you.",hi:"मैं बेटी अनन्या को सूचित कर रहा हूँ ताकि वो आपका हाल जान सकें।"}},h=v[m]||v.good;k.speak(h.en,h.hi)})});const b=document.getElementById("btnResetDemoData");b&&b.addEventListener("click",()=>{confirm("Reset demo data to initial state?")&&y.resetDemoData()})}function V(){const a=y.getState(),t=a.language==="hi",e=a.uiMode==="senior",n=a.theme==="light",i=a.language;document.body.classList.toggle("mode-senior",e),document.body.classList.toggle("mode-caregiver",!e),document.body.classList.toggle("theme-light",n),document.body.classList.toggle("theme-dark",!n);const d=document.getElementById("btnThemeDark"),g=document.getElementById("btnThemeLight");d&&d.classList.toggle("active",!n),g&&g.classList.toggle("active",n);const o=document.getElementById("btnLangEn"),u=document.getElementById("btnLangHi");o&&o.classList.toggle("active",i==="en"),u&&u.classList.toggle("active",i==="hi");const l=document.getElementById("btnModeSenior"),c=document.getElementById("btnModeCaregiver");l&&c&&(l.classList.toggle("active",e),c.classList.toggle("active",!e),l.innerHTML=p("modeSenior",i),c.innerHTML=p("modeCaregiver",i));const r=document.getElementById("btnOpenScanner"),f=document.getElementById("btnOpenPassport");r&&(r.innerHTML=p("pillScanNav",i)),f&&(f.innerHTML=p("passportNav",i));const A=document.querySelector(".brand-tagline");A&&(A.textContent=p("brandTagline",i));const $=document.querySelector(".voice-hero-text h2"),b=document.getElementById("voiceStatusText"),s=document.querySelector("#btnVoiceAssistant span:last-child"),m=document.getElementById("btnTriggerSOS");$&&($.textContent=p("voiceHeroTitle",i)),b&&!k.isListening&&!k.isSpeaking&&(b.innerHTML=p("voiceHeroSubDefault",i)),s&&(s.textContent=p("voiceBtnTalk",i)),m&&(m.innerHTML=`<span>${p("sosBtn",i)}</span>`);const v=document.getElementById("headerProfileName"),h=document.getElementById("headerProfileAvatar"),T=document.getElementById("headerProfileRole");v&&(v.textContent=a.user.preferredName||a.user.name),h&&(h.src=a.user.avatar),T&&(T.textContent=a.user.role==="senior"?p("seniorRole",i):p("caregiverRole",i)),document.querySelectorAll(".slot-tab").forEach(I=>{const L=I.getAttribute("data-slot");L==="all"?I.textContent=t?"पूरा दिन (All Day)":"All Day":L==="Morning"?I.textContent=t?"सुबह (Morning)":"Morning":L==="Afternoon"?I.textContent=t?"दोपहर (Afternoon)":"Afternoon":L==="Night"&&(I.textContent=t?"रात (Night)":"Night")});const S=(I,L)=>{const w=document.getElementById(I);w&&(w.textContent=L)};S("summaryBannerHeading",p("summaryTitle",i)),S("btnSpeakSummary",p("listenSummaryBtn",i)),S("btnSendWhatsAppDigest",p("whatsappDigestBtn",i)),S("metricAdherenceLabel",p("metricAdherence",i)),S("metricBPLabel",p("metricBP",i)),S("metricSugarLabel",p("metricSugar",i)),S("metricIndexLabel",p("metricIndex",i)),S("medsCardTitle",p("medsTitle",i)),S("medsCardSubtitle",p("medsSub",i)),S("wellnessCardTitle",p("wellnessTitle",i)),S("wellnessCardSubtitle",p("wellnessSub",i)),S("moodLabelGreat",p("moodGreat",i)),S("moodLabelGood",p("moodGood",i)),S("moodLabelOkay",p("moodOkay",i)),S("moodLabelTired",p("moodTired",i)),S("moodLabelUnwell",p("moodUnwell",i)),S("routineCardTitle",p("routineTitle",i)),S("routineCardSubtitle",p("routineSub",i)),S("aiPatternsCardTitle",p("aiPatternsTitle",i)),S("aiPatternsCardSubtitle",p("aiPatternsSub",i)),S("aiBadgeText",p("aiBadgeText",i)),S("vitalsCardTitle",p("vitalsTitle",i)),S("vitalsCardSubtitle",p("vitalsSub",i)),S("btnOpenAddVitals",p("logNewVitalsBtn",i)),S("btnOpenAddMed",p("btnAddMed",i)),S("btnOpenAddApt",p("btnAddApt",i)),S("btnOpenAddAct",p("btnAddAct",i)),S("appointmentsCardTitle",p("appointmentsTitle",i)),S("appointmentsCardSubtitle",p("appointmentsSub",i)),S("footerText",p("footerText",i)),S("btnResetDemoData",p("resetDataBtn",i)),q("medsListContainer",N),J("hydrationWidgetContainer"),K("appointmentsListContainer"),_("vitalsChartsContainer",a.vitals),ae(a),se(a),oe(a)}function ae(a){const t=document.getElementById("aiPatternsContainer");if(!t)return;const e=D(a),n=a.language==="hi",i=a.language,d=document.getElementById("healthIndexScore"),g=document.getElementById("healthIndexStatus"),o=document.getElementById("adherenceRingValue");if(d&&(d.textContent=`${e.overallHealthIndex.score}/100`,d.style.color=e.overallHealthIndex.color),g&&(g.textContent=e.overallHealthIndex.text),o&&(o.textContent=`${e.adherencePercent}%`),e.alerts.length===0){t.innerHTML=`
      <div class="empty-state">
        <span class="empty-icon">✅</span>
        <p>${n?"सभी स्वास्थ्य माप एवं पैटर्न सामान्य स्तर पर हैं।":"All recorded vitals and health patterns are within normal thresholds."}</p>
      </div>
    `;return}const u=e.alerts.map(l=>`
      <div class="pattern-alert-card ${l.severity}">
        <div class="pattern-header">
          <div class="pattern-badge-row">
            <span class="severity-chip ${l.severity}">${l.urgency}</span>
            <span class="category-chip">${l.category}</span>
          </div>
          <span class="pattern-metric">${l.metric}</span>
        </div>

        <h4 class="pattern-title">${n&&l.titleHi||l.title}</h4>
        
        <p class="pattern-observation">
          🔍 <strong>${p("observationLbl",i)}</strong> ${n&&l.observationHi||l.observation}
        </p>

        <div class="pattern-diagnosis">
          🧠 <strong>${p("diagnosisLbl",i)}</strong> ${l.aiDiagnosis}
        </div>

        <div class="pattern-action-box">
          <div class="action-text">
            👉 <strong>${p("actionLbl",i)}</strong> ${n&&l.actionRequiredHi||l.actionRequired}
          </div>
          <button class="voice-alert-btn" data-speak-alert="${l.id}" title="Read this AI finding">
            ${p("listenAlert",i)}
          </button>
        </div>
      </div>
    `).join("");t.innerHTML=u,t.querySelectorAll("[data-speak-alert]").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-speak-alert"),r=e.alerts.find(f=>f.id===c);if(r){const f=`${r.title}. ${r.observation}. Recommendation: ${r.actionRequired}`,A=`${r.titleHi||r.title}। ${r.observationHi||r.observation}। सुझाव: ${r.actionRequiredHi||r.actionRequired}`;k.speak(f,A)}})})}function se(a){const t=document.getElementById("dailySummaryContent");if(!t)return;const e=X(a);t.innerHTML=e.html;const n=document.getElementById("btnSpeakSummary");n&&(n.onclick=()=>{a.language,k.speak(e.plainText,e.plainText)})}function oe(a){const t=document.getElementById("activitiesContainer");if(!t)return;const e=a.language,i=(a.dailyActivities||[]).map(d=>`
    <div class="activity-item ${d.completed?"completed":""}" data-act-id="${d.id}">
      <span class="act-icon">${d.icon}</span>
      <div class="act-text">
        <span class="act-title">${d.title}</span>
        <span class="act-time">⏰ ${d.time}</span>
      </div>
      <div class="act-actions-row">
        <button class="act-edit-btn" data-edit-act="${d.id}" title="Edit activity">
          ✏️
        </button>
        <button class="act-check-btn ${d.completed?"checked":""}" data-toggle-act="${d.id}">
          ${d.completed?p("actDone",e):p("actMarkDone",e)}
        </button>
      </div>
    </div>
  `).join("");t.innerHTML=i,t.querySelectorAll("[data-toggle-act]").forEach(d=>{d.addEventListener("click",g=>{g.stopPropagation();const o=d.getAttribute("data-toggle-act");y.toggleActivity(o),E.playSuccess()})}),t.querySelectorAll("[data-edit-act]").forEach(d=>{d.addEventListener("click",g=>{g.stopPropagation();const o=d.getAttribute("data-edit-act");window.openEditActivityModal&&window.openEditActivityModal(o)})})}function le(){const a=document.getElementById("editMedModal"),t=document.getElementById("btnCloseEditMed"),e=document.getElementById("editMedForm"),n=document.getElementById("btnDeleteMed"),i=document.getElementById("btnOpenAddMed");window.openEditMedicationModal=b=>{const s=y.getState(),m=s.language,v=document.getElementById("editMedModalTitle");if(b){const h=s.medications.find(T=>T.id===b);if(!h)return;document.getElementById("editMedId").value=h.id,document.getElementById("inputMedName").value=h.name||"",document.getElementById("inputMedDose").value=h.dosage||"",document.getElementById("inputMedSlot").value=h.slot||"Morning",document.getElementById("inputMedTime").value=h.time||"08:30 AM",document.getElementById("inputMedFood").value=h.foodRelation||"After Breakfast",document.getElementById("inputMedPurpose").value=h.purpose||"",document.getElementById("inputMedStock").value=h.stock!==void 0?h.stock:20,document.getElementById("inputMedThreshold").value=h.refillThreshold||5,document.getElementById("inputMedInstructions").value=h.instructions||"",v&&(v.textContent=p("modalEditMedTitle",m)),n&&(n.style.display="inline-flex")}else document.getElementById("editMedId").value="",document.getElementById("inputMedName").value="",document.getElementById("inputMedDose").value="",document.getElementById("inputMedSlot").value="Morning",document.getElementById("inputMedTime").value="08:30 AM",document.getElementById("inputMedFood").value="After Breakfast",document.getElementById("inputMedPurpose").value="",document.getElementById("inputMedStock").value=30,document.getElementById("inputMedThreshold").value=7,document.getElementById("inputMedInstructions").value="",v&&(v.textContent=p("modalAddMedTitle",m)),n&&(n.style.display="none");a&&a.classList.add("active")},i&&i.addEventListener("click",()=>{window.openEditMedicationModal(null)}),t&&t.addEventListener("click",()=>{a&&a.classList.remove("active")}),a&&a.addEventListener("click",b=>{b.target===a&&a.classList.remove("active")}),e&&e.addEventListener("submit",b=>{b.preventDefault();const s=document.getElementById("editMedId").value,m={name:document.getElementById("inputMedName").value.trim(),dosage:document.getElementById("inputMedDose").value.trim(),slot:document.getElementById("inputMedSlot").value,time:document.getElementById("inputMedTime").value.trim()||"08:30 AM",foodRelation:document.getElementById("inputMedFood").value,purpose:document.getElementById("inputMedPurpose").value.trim(),stock:parseInt(document.getElementById("inputMedStock").value,10)||20,refillThreshold:parseInt(document.getElementById("inputMedThreshold").value,10)||5,instructions:document.getElementById("inputMedInstructions").value.trim(),shape:"circle",color:"#38bdf8"};s?y.updateMedication(s,m):y.addMedication(m),E.playSuccess(),a&&a.classList.remove("active")}),n&&n.addEventListener("click",()=>{const b=document.getElementById("editMedId").value,s=y.getState().language;b&&confirm(p("confirmDelete",s))&&(y.deleteMedication(b),E.playSuccess(),a&&a.classList.remove("active"))});const d=document.getElementById("editAptModal"),g=document.getElementById("btnCloseEditApt"),o=document.getElementById("editAptForm"),u=document.getElementById("btnDeleteApt"),l=document.getElementById("btnOpenAddApt");window.openEditAppointmentModal=b=>{const s=y.getState(),m=s.language,v=document.getElementById("editAptModalTitle");if(b){const h=s.appointments.find(T=>T.id===b);if(!h)return;document.getElementById("editAptId").value=h.id,document.getElementById("inputAptTitle").value=h.title||"",document.getElementById("inputAptDoctor").value=h.doctor||"",document.getElementById("inputAptHospital").value=h.hospital||"",document.getElementById("inputAptType").value=h.type||"Doctor",document.getElementById("inputAptDate").value=h.date||"",document.getElementById("inputAptTime").value=h.time||"10:30 AM",document.getElementById("inputAptNotes").value=h.notes||"",v&&(v.textContent=p("modalEditAptTitle",m)),u&&(u.style.display="inline-flex")}else document.getElementById("editAptId").value="",document.getElementById("inputAptTitle").value="",document.getElementById("inputAptDoctor").value="",document.getElementById("inputAptHospital").value="",document.getElementById("inputAptType").value="Doctor",document.getElementById("inputAptDate").value=new Date().toISOString().split("T")[0],document.getElementById("inputAptTime").value="10:30 AM",document.getElementById("inputAptNotes").value="",v&&(v.textContent=p("modalAddAptTitle",m)),u&&(u.style.display="none");d&&d.classList.add("active")},l&&l.addEventListener("click",()=>{window.openEditAppointmentModal(null)}),g&&g.addEventListener("click",()=>{d&&d.classList.remove("active")}),d&&d.addEventListener("click",b=>{b.target===d&&d.classList.remove("active")}),o&&o.addEventListener("submit",b=>{b.preventDefault();const s=document.getElementById("editAptId").value,m={title:document.getElementById("inputAptTitle").value.trim(),doctor:document.getElementById("inputAptDoctor").value.trim(),hospital:document.getElementById("inputAptHospital").value.trim(),type:document.getElementById("inputAptType").value,date:document.getElementById("inputAptDate").value,time:document.getElementById("inputAptTime").value.trim()||"10:30 AM",notes:document.getElementById("inputAptNotes").value.trim()};s?y.updateAppointment(s,m):y.addAppointment(m),E.playSuccess(),d&&d.classList.remove("active")}),u&&u.addEventListener("click",()=>{const b=document.getElementById("editAptId").value,s=y.getState().language;b&&confirm(p("confirmDelete",s))&&(y.deleteAppointment(b),E.playSuccess(),d&&d.classList.remove("active"))});const c=document.getElementById("editActModal"),r=document.getElementById("btnCloseEditAct"),f=document.getElementById("editActForm"),A=document.getElementById("btnDeleteAct"),$=document.getElementById("btnOpenAddAct");window.openEditActivityModal=b=>{const s=y.getState(),m=s.language,v=document.getElementById("editActModalTitle");if(b){const h=s.dailyActivities.find(T=>T.id===b);if(!h)return;document.getElementById("editActId").value=h.id,document.getElementById("inputActTitle").value=h.title||"",document.getElementById("inputActTime").value=h.time||"06:45 AM",document.getElementById("inputActIcon").value=h.icon||"🚶",v&&(v.textContent=p("modalEditActTitle",m)),A&&(A.style.display="inline-flex")}else document.getElementById("editActId").value="",document.getElementById("inputActTitle").value="",document.getElementById("inputActTime").value="07:00 AM",document.getElementById("inputActIcon").value="🚶",v&&(v.textContent=p("modalAddActTitle",m)),A&&(A.style.display="none");c&&c.classList.add("active")},$&&$.addEventListener("click",()=>{window.openEditActivityModal(null)}),r&&r.addEventListener("click",()=>{c&&c.classList.remove("active")}),c&&c.addEventListener("click",b=>{b.target===c&&c.classList.remove("active")}),f&&f.addEventListener("submit",b=>{b.preventDefault();const s=document.getElementById("editActId").value,m={title:document.getElementById("inputActTitle").value.trim(),time:document.getElementById("inputActTime").value.trim()||"07:00 AM",icon:document.getElementById("inputActIcon").value};s?y.updateActivity(s,m):y.addActivity(m),E.playSuccess(),c&&c.classList.remove("active")}),A&&A.addEventListener("click",()=>{const b=document.getElementById("editActId").value,s=y.getState().language;b&&confirm(p("confirmDelete",s))&&(y.deleteActivity(b),E.playSuccess(),c&&c.classList.remove("active"))})}
