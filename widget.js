class AxisWidgetChat{constructor(e,t,i){this.baseUrl="https://axis-server.semprocesso.com.br",this.ticketId=e,this.ticketData={},this.token=t,this.isLoading=!1,this.userData=i,this.render(),this.fetchTicketData(),this.intervalId=setInterval(()=>this.fetchTicketData(),3e4)}Icon={Chat:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',ChevronDown:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>',ChevronLeft:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>',ChevronRight:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',Home:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',Messages:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>',Send:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>',Paperclip:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>',File:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',Loading:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>'};async fetchTicketData(){this.token&&(this.isLoading=!0,fetch(`${this.baseUrl}/tickets/view/${this.ticketId}`,{method:"GET",headers:{authorization:this.token,"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{this.ticketData=e,this.isLoading=!1,this.renderChatMessages(),this.renderChatHeaderData(),this.renderChatActions()}).catch(e=>{this.isLoading=!1,console.error("Error fetching messages:",e)}))}async fetchAddComment(e){fetch(`${this.baseUrl}/tickets/comment`,{method:"POST",headers:{authorization:this.token},body:e}).then(e=>e.json()).catch(e=>{console.error(e)})}async fetchDownloadFile(e){let t=document.querySelector(`#${e.messageId} button`),i=t.innerHTML;t.innerHTML=`<span>baixando... ${this.Icon.Loading}</span>`,t.disabled=!0;try{let s=e.s3path.split("/")[1],a=await fetch(`${this.baseUrl}/tickets/attachments/download/${s}`,{method:"GET",headers:{authorization:this.token}});if(!a.ok)throw Error("Erro ao baixar o arquivo");let o=await a.blob(),r=document.createElement("a");r.href=URL.createObjectURL(o),r.download=e.originalFile,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(r.href)}catch(n){console.error("Erro ao baixar o arquivo:",n)}finally{t.innerHTML=i,t.disabled=!1}}ChatMessage(e,t=!0,i=!0){let s=e.userId===this.userData.id;return`
            <div class="axis-widget-chat-message-container" data-from-user="${s}">
                <div id="${e.id}" class="axis-widget-chat-message" data-from-user="${s}">
                ${t?`<strong>${e.username}</strong>`:""}

                ${e.attachment?`
                        <button class="axis-widget-chat-message-button" onclick='_axisWidgetChat.fetchDownloadFile(${JSON.stringify({...e.attachment,messageId:e.id})})'>
                            ${this.Icon.File}
                            ${e.attachment.originalFile} 
                            <span>(${this.getFileSize(e.attachment.size)})</span>
                        </button>
                    `:`<p>${e.text}</p>`}
                </div>
                 ${i?`<small>
                    ${new Date(e.date).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:!1})}</small>`:""}
            </div>`}renderChatMessages(){let e=document.querySelector(".axis-widget-chat-messages"),t=this.ticketData.messages.reduce((e,t)=>{let i=new Date(t.date).toLocaleDateString("pt-BR"),s=e.find(e=>e.date===i);return s?s.messages.push(t):e.push({date:i,messages:[t]}),e},[]);e.innerHTML=`${t.map(e=>`
                    <div class="date-group">
                        <div class="date-group-header">${e.date}</div>
                        ${e.messages.map((t,i)=>{let s=t.userId!==e.messages[i-1]?.userId&&t.userId!==this.userData.id,a=t.userId!==e.messages[i+1]?.userId||i===e.messages.length-1;return this.ChatMessage(t,s,a)}).join("")}
                        
                    </div>
                `).join("")}
            ${this.isLoading?`<small>Enviando mensagem...${this.Icon.Loading}</small>`:""}
            `}scrollChatToBottom(){let e=document.querySelector(".axis-widget-chat-messages");e.scrollTop=e.scrollHeight}async sendMessage(){try{this.isLoading=!0,this.renderChatMessages(),this.scrollChatToBottom();let e=document.getElementById("chat-input"),t=document.getElementById("file-input"),i=e.value,s=t.files[0];if(!i&&!s)return;let a=new FormData;a.append("ticketId",this.ticketId),a.append("username",this.userData.name),a.append("userId",this.userData.id),i&&a.append("text",i),s&&a.append("file",s),e.value="",t.value="",await this.fetchAddComment(a),setTimeout(async()=>await this.fetchTicketData(),1e3)}catch(o){console.error(o)}finally{this.isLoading=!1,setTimeout(this.renderChatMessages,100),setTimeout(this.scrollChatToBottom,200)}}renderChatHeaderData(){let e=document.querySelector(".axis-widget-chat-header h2"),t=document.querySelector(".axis-widget-chat-header-status");e.innerHTML=this.ticketData?.title,t.innerHTML=this.ticketData?.opened?"Aberto":"Fechado",t.setAttribute("data-type",this.ticketData?.opened?"opened":"closed")}getFileSize(e){if("string"==typeof e&&(e=parseInt(e,10)),e<0)throw Error("bytes cannot be negative");let t,i;switch(!0){case e>=0x1000000000000000:t=e/0x1000000000000000,i="EB";break;case e>=0x4000000000000:t=e/0x4000000000000,i="PB";break;case e>=1099511627776:t=e/1099511627776,i="TB";break;case e>=1073741824:t=e/1073741824,i="GB";break;case e>=1048576:t=e/1048576,i="MB";break;case e>=1024:t=e/1024,i="KB";break;default:return e+" B"}return t.toFixed(2)+" "+i}ChatHeader(){return`
            <header class="axis-widget-chat-header">
                <div>
                <button type="button" onclick="_axisWidget.setState({currentTab:'home'})">${this.Icon.ChevronLeft}</button>
                    <h2></h2>
                </div>
                <span class="axis-widget-chat-header-status"></span>
            </header>
        `}renderChatActions(){let e=document.querySelector(".axis-widget-chat-actions");this.ticketData?.opened?e.innerHTML=`
                <button class="axis-widget-chat-actions-file-button" type="button" onclick="document.getElementById('file-input').click()">
                    ${this.Icon.Paperclip}
                </button>
                <input id="chat-input" placeholder="Escreva sua mensagem" autocomplete="off" onkeypress="if(event.key === 'Enter') _axisWidgetChat.sendMessage()" />
                <input type="file" id="file-input" style="display: none;" onchange="_axisWidgetChat.sendMessage()" />
                <button class="axis-widget-chat-actions-send-button" type="button" onclick="_axisWidgetChat.sendMessage()">${this.Icon.Send}</button>
            `:e.innerHTML=""}render(){let e=document.querySelector("#axis-widget-chat-wrapper");e.innerHTML=`
            ${this.ChatHeader()}
            <main class="axis-widget-chat-messages">${this.isLoading?"Carregando mensagens...":""}</main>
            <footer class="axis-widget-chat-actions"></footer>
        `}destroy(){clearInterval(this.intervalId);let e=document.querySelector("#axis-widget-chat");e&&e.remove()}}class AxisWidgetClass{constructor({userName:e,userEmail:t,userId:i,origin:s,company:a,data:o,isOpen:r}){if(this.baseUrl="https://axis-server.semprocesso.com.br",this.user={name:e,email:t,id:i,company:a.toLowerCase(),origin:s.toLowerCase(),data:o},this.state={isOpen:r,currentTab:"home",isLoading:!0,tickets:[],selectedTicket:null,selectedTicketOpened:!0,selectedTicketMessages:[],token:o.token,disclaimer:"Normalmente responderemos em alguns minutos",tags:[]},this.formFields={title:"",description:"",priority:1,tags:"null"},!e||!t||!i||!s||!a)throw Error("Missing required parameters: userName, userEmail, userId, origin, company");this.componentWillMount(),this.setStyle(),this.render(),this.fetchAuth(),setTimeout(()=>this.fetchList(),1e3)}Icon={Chat:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',ChevronDown:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>',ChevronLeft:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>',ChevronRight:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',Home:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',Messages:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>',Send:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>',SquareChat:'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1.5 4.5C0.95 4.5 0.5 4.05 0.5 3.5V1C0.5 0.45 0.95 0 1.5 0H5.5C6.05 0 6.5 0.45 6.5 1V3.5C6.5 4.05 6.05 4.5 5.5 4.5H4.5V6L3 4.5H1.5ZM10.5 7.5C11.05 7.5 11.5 7.05 11.5 6.5V4C11.5 3.45 11.05 3 10.5 3H7.5V3.5C7.5 4.6 6.6 5.5 5.5 5.5V6.5C5.5 7.05 5.95 7.5 6.5 7.5H7.5V9L9 7.5H10.5Z" fill="#00695C"/></svg>',Team:'<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11 6.61C11 3.865 8.87 2 6.5 2C4.155 2 2 3.825 2 6.64C1.7 6.81 1.5 7.13 1.5 7.5V8.5C1.5 9.05 1.95 9.5 2.5 9.5H3V6.45C3 4.515 4.565 2.95 6.5 2.95C8.435 2.95 10 4.515 10 6.45V10H6V11H10C10.55 11 11 10.55 11 10V9.39C11.295 9.235 11.5 8.93 11.5 8.57V7.42C11.5 7.07 11.295 6.765 11 6.61Z" fill="white"/><path d="M5 7.5C5.27614 7.5 5.5 7.27614 5.5 7C5.5 6.72386 5.27614 6.5 5 6.5C4.72386 6.5 4.5 6.72386 4.5 7C4.5 7.27614 4.72386 7.5 5 7.5Z" fill="white"/><path d="M8 7.5C8.27614 7.5 8.5 7.27614 8.5 7C8.5 6.72386 8.27614 6.5 8 6.5C7.72386 6.5 7.5 6.72386 7.5 7C7.5 7.27614 7.72386 7.5 8 7.5Z" fill="white"/><path d="M9.49998 6.015C9.38076 5.31207 9.01669 4.67398 8.47221 4.21369C7.92773 3.7534 7.23796 3.50059 6.52498 3.5C5.00998 3.5 3.37998 4.755 3.50998 6.725C4.12667 6.47288 4.67134 6.07199 5.09536 5.55811C5.51938 5.04422 5.80956 4.43334 5.93998 3.78C6.59498 5.095 7.93998 6 9.49998 6.015Z" fill="white"/></svg>'};componentWillMount(){let e=document.querySelector("body"),t=document.createElement("div"),i=document.createElement("div"),s=document.createElement("button");t.id="axis-widget-root",i.id="axis-widget-chat-wrapper",i.setAttribute("data-visible",this.state.isOpen),s.id="axis-widget-float-icon";let a=()=>this.state.isOpen?this.Icon.ChevronDown:this.Icon.Chat;s.innerHTML=a(),s.addEventListener("click",()=>{this.setState({isOpen:!this.state.isOpen}),i.setAttribute("data-visible",this.state.isOpen),s.innerHTML=a()}),e.appendChild(t),t.appendChild(i),t.appendChild(s)}setState(e){this.state={...this.state,...e},this.render()}setFormFields(e){this.formFields={...this.formFields,...e}}setStyle(){let e=`
        :root{--axis-w-icon-size: 48px;--axis-w-primary-color: #009688;--Brand-Main-super-light: #80CBC3;--Brand-Main-super-dark: #00695C;--axis-w-light-color: rgba(202, 244, 247, 1);--axis-w-b0-color: #ffffff;--axis-w-b1-color: #f8f8f8;--axis-w-b2-color: #dddddd;--axis-w-b3-color: #666666;--axis-text-disabled: #BFBFBF;--axis-shadow: 0 5px 20px rgba(35, 35, 35, .35);--axis-gradient: linear-gradient(135deg, rgba(8, 84, 77, 1) 13%, rgba(0, 150, 136, 1) 52%, rgba(202, 244, 247, 1) 100%);--axis-header-bg: #00695C}#axis-widget-root{position: fixed;right: 20px;bottom: 20px;display: flex;flex-direction: column;align-items: flex-end;justify-content: flex-end;gap: 16px}#axis-widget-float-icon{all: unset;width: var(--axis-w-icon-size);height: var(--axis-w-icon-size);border-radius: 50%;background-color: var(--axis-w-primary-color);color: var(--axis-w-b0-color);display: flex;justify-content: center;align-items: center;transition: 0.1s;cursor: pointer}#axis-widget-float-icon:hover{transform: scale(1.1)}#axis-widget-chat-wrapper{width: 400px;border-radius: 16px;background-color: var(--axis-w-b0-color);display: none;overflow: hidden;box-shadow: var(--axis-shadow)}#axis-widget-chat-wrapper[data-visible=true]{display: flex;height: 500px;flex-direction: column;justify-content: space-between}#axis-widget-chat>footer{display: flex;justify-content: center;gap: 32px;padding: 16px 32px;background-color: var(--axis-w-b1-color)}#axis-widget-chat>footer>button{all: unset;cursor: pointer;display: flex;align-items: center;gap: 8px;flex-direction: column;font-size: 12px;transition: all ease 0.1s}#axis-widget-chat>footer>button:hover{color: var(--axis-w-primary-color)}#axis-widget-chat>footer>button[data-enable=true]{color: var(--axis-w-primary-color)}.axis-widget-chat-header-welcome{display: flex;align-items: flex-start;padding: 16px;gap: 16px;font-size: 24px;flex-direction: column;font-weight: bold;background: var(--Brand-Main-super-dark);color: var(--axis-w-b0-color)}.axis-widget-chat-header-welcome-flags{width: 100%;display: flex;align-items: center;justify-content: center;gap: 8px}.axis-widget-chat-header-welcome-flags span{display: flex;align-items: center;gap: 4px;font-size: 10px;font-weight: 400;line-height: 150%;letter-spacing: 0.4px;padding: 4px 12px;border-radius: 50px;background-color: var(--Brand-Main-super-light);color: #00695C}.axis-widget-chat-header-welcome-flags span:nth-child(2){background-color: #009688;color: var(--axis-w-b0-color)}.axis-widget-chat-header-welcome-title{display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;width: 100%;font-size: 20px;font-weight: 700;line-height: 120%}.axis-widget-chat-header-welcome-title span:nth-child(1){font-size: 16px;font-weight: 400;line-height: 150%;letter-spacing: 0.5px}.axis-widget-chat-header-welcome hr{width: 100%;border: 1px solid #007969;margin: 0}.axis-widget-chat-header-welcome-infos{width: 100%;font-size: 12px;font-weight: 500;line-height: 150%;letter-spacing: -0.04px;display: flex;flex-direction: column;align-items: center;justify-content: center}.axis-widget-chat-header-welcome-infos small{font-size: 12px;font-weight: 400;color: var(--axis-text-disabled)}.axis-widget-chat-header{background: var(--axis-header-bg);color: var(--axis-w-b0-color);padding: 16px;display: flex;place-items: center;justify-content: space-between;font-size: 14px;font-weight: 600;gap: 8px}.axis-widget-chat-header h2{font-size: 14px;font-weight: 600}.axis-widget-chat-header div{display: flex;align-items: center;gap: 8px}.axis-widget-chat-header button{width: 20px;height: 20px;border-radius: 50px;background-color: var(--Brand-Main-super-light);display: flex;align-items: center;justify-content: center;box-sizing: border-box;cursor: pointer}.axis-widget-chat-header button svg{width: 16px;height: 16px;color: #1b1b1b}.axis-widget-chat-header-status{background-color: #81D5FF;color: #3B3B3B;font-size: 10px;font-weight: 400;line-height: 150%;letter-spacing: 0.4px;padding: 2px 8px;border-radius: 50px}.axis-widget-chat-header-status[data-type='closed']{background-color: var(--axis-w-b3-color);color: var(--axis-text-disabled)}.axis-widget-ticket-list{flex-grow: 1;overflow-y: scroll;overflow-x: hidden;display: flex;flex-direction: column;align-items: center;gap: 8px;padding: 0 16px 32px 32px;font-size: 14px}.axis-widget-ticket-list::-webkit-scrollbar, .axis-widget-chat-messages::-webkit-scrollbar{display: block;background: transparent;width: 16px}.axis-widget-ticket-list::-webkit-scrollbar-thumb, .axis-widget-chat-messages::-webkit-scrollbar-thumb{border: 5px solid transparent;background-clip: padding-box;border-radius: 9999px;background-color: var(--axis-w-b2-color)}.axis-widget-ticket-list-message{color: var(--axis-w-b3-color);flex: 1;display: flex;align-items: center}.axis-widget-ticket-list-title{font-size: 14px;font-weight: 600;width: 100%;position: sticky;top: 0;background: var(--axis-w-b0-color);margin-top: 24px;z-index: 1;padding: 8px 0 4px 0;box-shadow: 0px 5px 5px #ffffff}.axis-widget-ticket-card{all: unset;display: flex;gap: 16px;align-items: center;padding: 8px 16px;border-radius: 4px;font-size: 14px;cursor: pointer;background-color: #FAFAFA;border-radius: 8px;border: 1px solid #F2F2F2;width: 100%;box-sizing: border-box}.axis-widget-ticket-card p{display: flex;flex-direction: column;align-items: flex-start;overflow: hidden;width: 100%}.axis-widget-ticket-card p strong{font-size: 14px;font-weight: 600;color: #1C1C1C}.axis-widget-ticket-card p span{opacity: 0.75;font-size: 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 100%;color: #757474}.axis-widget-ticket-card-icon-content{background-color: #009688;padding: 3px;border-radius: 50px;width: 20px;height: 20px;display: flex;align-items: center;justify-content: center}.axis-widget-ticket-card-icon-content svg{width: 16px;height: 16px;color: var(--axis-w-b0-color)}.axis-widget-ticket-card[data-opened=false]{opacity: 0.5;color: var(--axis-w-b3-color)}.axis-widget-ticket-card[data-opened=false] .axis-widget-ticket-card-icon-content{background-color: var(--axis-text-disabled)}.axis-widget-chat-messages{flex-grow: 1;overflow-y: scroll;overflow-x: hidden;display: flex;flex-direction: column;gap: 8px;padding: 16px 16px 16px 32px}.axis-widget-chat-messages small{display: flex;justify-content: flex-end;align-items: flex-end;font-size: 10px;gap: 8px}.axis-widget-chat-messages small svg{width: 12px;height: 12px;color: var(--axis-w-primary-color);animation: spin 1s linear infinite}.date-group{display: flex;flex-direction: column;gap: 8px}.date-group-header{background-color: var(--axis-w-b2-color);padding: 8px 16px;border-radius: 8px;margin-bottom: 8px;width: fit-content;margin: 8px auto 0 auto;font-size: 10px}.axis-widget-chat-message-container{display: flex;flex-direction: column}.axis-widget-chat-message{display: flex;flex-direction: column;align-self: flex-end;background-color: var(--axis-w-light-color);padding: 8px 16px;border-radius: 8px;width: fit-content;margin-left: auto}.axis-widget-chat-message strong{align-self: flex-end;font-size: 12px;font-weight: 500;color: var(--axis-w-primary-color)}.axis-widget-chat-message-container small{display: flex;flex-direction: column;align-items: flex-end;font-size: 10px}.axis-widget-chat-message p{font-size: 14px;color: var(--axis-w-b3-color)}.axis-widget-chat-message[data-from-user=false]{background-color: var(--axis-w-b2-color);color: var(--axis-w-b3-color);align-self: flex-start;margin-left: 0}.axis-widget-chat-message[data-from-user=false] strong, .axis-widget-chat-message-container[data-from-user=false] small{align-self: flex-start;align-items: flex-start}.axis-widget-chat-message-button{display: flex;align-items: flex-start;padding: 4px;gap: 4px;font-size: 14px;background: none;color: var(--axis-w-primary-color);border-radius: 4px;cursor: pointer}.axis-widget-chat-message-button svg{width: 16px;height: 16px}.axis-widget-chat-message-button span{color: var(--axis-w-b3-color)}.axis-widget-chat-message-button span svg{animation: spin linear 1s}.axis-widget-chat-actions{display: flex;gap: 16px;align-items: center;padding: 8px 16px;background-color: var(--axis-w-b0-color);border: 1px solid var(--axis-w-b2-color);font-size: 14px}.axis-widget-chat-actions:empty{display: none}.axis-widget-chat-actions input{font-size: 14px;font-weight: 400;line-height: 150%;letter-spacing: 0.4px;box-sizing: border-box;border: none;width: 100%}.axis-widget-chat-actions button{padding: 8px;border-radius: 4px}.axis-widget-chat-actions button:hover{background-color: var(--Brand-Main-super-light)}.axis-widget-chat-actions button:hover svg{color: var(--Brand-Main-super-dark)}.axis-widget-chat-actions-file-button{all: unset;cursor: pointer;display: flex;align-items: center;gap: 8px;font-size: 14px;border-radius: 80px;color: var(--axis-w-b3-color);transition: all ease 0.1s}.axis-widget-chat-actions-file-button svg{width: 16px;height: 16px;color: var(--Brand-Main-super-light)}.axis-widget-chat-actions-send-button{all: unset;cursor: pointer;display: flex;align-items: center;color: var(--axis-w-b3-color);transition: all ease 0.1s}.axis-widget-chat-actions-send-button svg{width: 16px;height: 16px;color: var(--axis-w-primary-color)}.axis-widget-new-ticket-form{display: flex;flex-direction: column;padding: 30px;gap: 20px;height: 100%}.axis-widget-new-ticket-form label{display: flex;flex-direction: column;gap: 4px;width: 100%;font-size: 10px;position: relative;border: 1px solid #B5B5B5;padding: 10px}.axis-widget-new-ticket-form label span{color: #B5B5B5;position: absolute;padding: 0 4px;top: -7px;left: 10px;background-color: var(--axis-w-b0-color)}.axis-widget-new-ticket-form input, .axis-widget-new-ticket-form select{border: none;color: #6D6D6D}.axis-widget-new-ticket-form-footer{display: flex;align-items: center;justify-content: space-between;gap: 20px;width: 100%;margin-top: auto}.axis-widget-new-ticket-form-footer button{height: 100%;font-size: 10px;font-weight: 400;line-height: 150%;letter-spacing: 0.4px;background:none;cursor: pointer;transition: all ease 0.3s}.axis-widget-new-ticket-form-footer button[data-type='submit']{display: flex;align-items: center;justify-content: center;gap: 16px;padding: 8px;background-color: var(--axis-w-primary-color);color: var(--axis-w-b0-color);border-radius: 4px;font-size: 12px;font-weight: 500;line-height: 100%;cursor: pointer}.axis-widget-new-ticket-form button:disabled{background-color: var(--axis-w-b3-color);cursor: default}@keyframes spin{from{transform: rotate(0deg)}to{transform: rotate(360deg)}}
        `,t=document.createElement("style");t.innerHTML=e,document.head.appendChild(t)}fetchAuth(){fetch(`${this.baseUrl}/users/guest/verify`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:this.user.name,email:this.user.email,userId:this.user.id,company:this.user.company,origin:this.user.origin})}).then(e=>e.json()).then(({disclaimer:e,tags:t})=>{let i={};e&&(i.disclaimer=e),t&&(i.tags=t),this.setState(i)}).catch(e=>{console.error(e)})}fetchCreate(){let e=JSON.stringify({title:this.formFields.title,tags:this.formFields.tags,userId:this.user.id,text:this.user.text,origin:this.user.origin,priority:this.formFields.priority});fetch(`${this.baseUrl}/tickets/create`,{method:"PUT",headers:{"Content-Type":"application/json",authorization:this.state.token},body:e}).then(e=>e.json()).then(()=>{this.setFormFields({title:"",description:"",priority:1,tags:[]}),this.fetchList(),this.setState({currentTab:"home"})}).catch(e=>{console.error(e)})}fetchList(){0!==this.state.token.length&&(this.setState({isLoading:!0}),fetch(`${this.baseUrl}/tickets/list`,{method:"POST",headers:{authorization:this.state.token,"Content-Type":"application/json"},body:JSON.stringify({params:{origin:this.user.origin}})}).then(e=>e.json()).then(e=>{this.setState({tickets:e,isLoading:!1})}).then(()=>this.refreshTicketList()).catch(e=>{this.setState({isLoading:!1}),console.error(e)}))}fetchChat(e){fetch(`${this.baseUrl}/tickets/${e}`).then(e=>e.json()).then(e=>this.setState({selectedTicketMessages:e.messages})).catch(e=>{console.error(e)})}WelcomeHeader(){let e=this.user?.name.split(" ")[0]||"\xf0Ÿ‘‹";return`
        <header class="axis-widget-chat-header-welcome">
            <div class="axis-widget-chat-header-welcome-flags">
                <span> ${this.Icon.SquareChat} Chat</span>
            </div>
            <div class="axis-widget-chat-header-welcome-title">
                <span>Ol\xc3\xa1 ${e}</span>
                <span>Como podemos ajudar voc\xc3\xaa?</span>
            </div>
            <hr/>
            <div class="axis-widget-chat-header-welcome-infos">
                <small>Hor\xc3\xa1rio de funcionamento</small>
                <strong>09:00 \xc3 s 18:00, exceto nos finais de semana</strong>
            </div>
        </header>`}TicketCard({title:e,description:t,icon:i,opened:s,id:a,currentTab:o="chat"}){return`<button type="button" class="axis-widget-ticket-card" data-opened="${s}" onclick="_axisWidget.setState({currentTab:'${o}',selectedTicket:'${a}',selectedTicketOpened:${s},selectedTicketMessages:[]});" >
        <p><strong>${e}</strong><span>${t}</span></p>
        <div class="axis-widget-ticket-card-icon-content">${i}</div>
      </button>`}refreshTicketList(){let e=document.querySelector(".axis-widget-ticket-list");return this.state.tickets.length>0?e.innerHTML=`
            <strong class="axis-widget-ticket-list-title">\xc3šltimos tickets</strong>
            ${this.state.tickets.map(({title:e,tag:t,id:i,opened:s})=>this.TicketCard({id:i,title:e,description:`${i} - ${t}`,opened:s,icon:this.Icon.ChevronRight})).join("")}
        `:e.innerHTML=`
            <small class="axis-widget-ticket-list-message">Nenhum ticket encontrado</small>
        `}TicketList(){return`
        <main class="axis-widget-ticket-list">
          ${(function e(){return this.state.isLoading?'<small class="axis-widget-ticket-list-message">Carregando...</small>':this.state.tickets.length>0?`
            <strong class="axis-widget-ticket-list-title">\xc3šltimos tickets</strong>
            ${this.state.tickets.map(({title:e,tag:t,id:i,opened:s})=>this.TicketCard({id:i,title:e,description:`${i} - ${t}`,opened:s,icon:this.Icon.ChevronRight})).join("")}
            `:'<small class="axis-widget-ticket-list-message">Nenhum ticket encontrado</small>'}).call(this)}
        </main>
      `}ChatHeader(e="Ticket"){return`<header class="axis-widget-chat-header">
        <div>
            <button type="button" onclick="_axisWidget.setState({currentTab:'home'})">${this.Icon.ChevronLeft}</button>
            <span>${e} ${this.state.selectedTicket??""}</span>
        </div>
        ${"chat"===this.state.currentTab?`<span class="axis-widget-chat-header-status" data-type="${this.state.selectedTicketOpened?"opened":"closed"}">
            ${this.state.selectedTicketOpened?"Aberto":"Fechado"}
        </span>`:""}
      </header>`}ChatMessage(e){let t="user"===e.userType;return`<div class="axis-widget-chat-message" data-from-user="${t}">${e.text}</div>`}ChatMessages(){return`<main class="axis-widget-chat-messages">
        ${this.state.selectedTicketMessages?.map(e=>this.ChatMessage(e)).join("")}
        </main>`}ChatActions(){return`<footer class="axis-widget-chat-actions">
        <input type="text" placeholder="Escreva sua mensagem" />
        <button type="button">${this.Icon.Send}</button>
      </footer>`}handleCancelForm(){this.setFormFields({title:"",tags:"null"}),this.setState({currentTab:"home"})}isBusinessHours(){let e=new Date,t=e.getDay(),i=e.getHours();return t>=1&&t<=5&&i>=9&&i<18}updateNewTicketButton(){let e=document.querySelector(".axis-widget-new-ticket-form input"),t=document.querySelector(".axis-widget-new-ticket-form select"),i=document.querySelector(".axis-widget-submit-ticket-button");e&&t&&i&&(e.value.length<3||"null"===t.value||""===t.value?i.disabled=!0:i.disabled=!1)}NewTicketForm(){return`<form class="axis-widget-new-ticket-form">
            <label>
                <span>T\xc3\xadtulo</span>
                <input 
                    type="text" 
                    placeholder="T\xc3\xadtulo do ticket" 
                    onkeyup="_axisWidget.setFormFields({title: this.value})" 
                    name="title"
                    oninput="_axisWidget.updateNewTicketButton()" 
                    value="${this.formFields.title||""}"
                />
            </label>
            <label>
                <span>Tag</span>
                <select name="tag" 
                    onmouseup="_axisWidget.setFormFields({tags: this.value})" 
                    onchange="_axisWidget.updateNewTicketButton()">
                    <option value='null'>Selecione uma op\xc3\xa7\xc3\xa3o...</option>
                    ${this.state.tags.map(e=>`
                        <option value='${e}' ${this.formFields.tags===e?"selected":""}>${e}</option>
                    `).join("")}
                </select>
            </label>
            
            <footer class="axis-widget-new-ticket-form-footer">
                <button type="button"onclick="_axisWidget.handleCancelForm()">Cancelar</button>
                <button class="axis-widget-submit-ticket-button" type="button" data-type="submit"
                    onclick="_axisWidget.fetchCreate()" disabled>
                    Criar novo ticket
                </button>
            </footer>
            
        </form>`}render(){let{currentTab:e,selectedTicket:t}=this.state,i=document.querySelector("#axis-widget-chat-wrapper");"home"===e?i.innerHTML=`
            ${this.WelcomeHeader()}
            ${this.TicketCard({title:"Iniciar uma nova conversa",description:this.state.disclaimer,id:"",opened:!0,icon:this.Icon.Send,currentTab:"new"})}
            ${this.TicketList()}`:"chat"===e&&t?(window._axisWidgetChat&&_axisWidgetChat.destroy(),window._axisWidgetChat=new AxisWidgetChat(t,this.state.token,this.user)):"new"===e&&(i.innerHTML=`
                ${this.ChatHeader()}
                ${this.NewTicketForm()}
            `)}}function AxisWidget({userName:e,userEmail:t,userId:i,origin:s,company:a,data:o={},isOpen:r=!1}){window._axisWidget=new AxisWidgetClass({userName:e,userEmail:t,userId:i,origin:s,company:a,data:o,isOpen:r})}export default AxisWidget;
