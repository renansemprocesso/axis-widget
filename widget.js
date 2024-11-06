class AxisWidgetChat {
  constructor(ticketId, token, userData) {
    this.baseUrl = 'https://axis-server.semprocesso.com.br'
    this.ticketId = ticketId
    this.ticketData = {}
    this.token = token
    this.isLoading = false
    this.userData = userData

    this.render()
    this.fetchTicketData()
    this.intervalId = setInterval(() => this.fetchTicketData(), 30 * 1000)
  }

  Icon = {
    Chat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    ChevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`,
    ChevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`,
    ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`,
    Home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    Messages: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>`,
    Send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`,
    Paperclip: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`,
    File: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>`,
    Loading: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
  }

  async fetchTicketData() {
    if (!this.token) return
    this.isLoading = true
    fetch(`${this.baseUrl}/tickets/view/${this.ticketId}`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.ticketData = data
        this.isLoading = false
        this.renderChatMessages()
        this.renderChatHeaderData()
        this.renderChatActions()
      })
      .catch(error => {
        this.isLoading = false
        console.error('Error fetching messages:', error)
      })
  }

  async fetchAddComment(formData) {
    fetch(`${this.baseUrl}/tickets/comment`, {
      method: 'POST',
      headers: {
        authorization: this.token,
      },
      body: formData,
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error)
      })
  }

  async fetchDownloadFile(attachment) {
    const buttonFile = document.querySelector(`#${CSS.escape(attachment.messageId)} button`)
    const buttonData = buttonFile.innerHTML
    buttonFile.innerHTML = `<span>baixando... ${this.Icon.Loading}</span>`
    buttonFile.disabled = true
    try {
      const filename = attachment.s3path.split('/')[1]
      const response = await fetch(`${this.baseUrl}/tickets/attachments/download/${filename}`, {
        method: 'GET',
        headers: {
          authorization: this.token,
        },
      })

      if (!response.ok) throw new Error('Erro ao baixar o arquivo')

      const blob = await response.blob()

      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = attachment.originalFile
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error)
    } finally {
      buttonFile.innerHTML = buttonData
      buttonFile.disabled = false
    }
  }

  ChatMessage(message, showUserName = true, showDate = true) {
    const fromUser = message.userType === 'user'
    return `
            <div class="axis-widget-chat-message-container" data-from-user="${fromUser}">
                <div id="${
                  message.id
                }" class="axis-widget-chat-message" data-from-user="${fromUser}">
                ${showUserName ? `<strong>${message.username}</strong>` : ''}

                ${
                  message.attachment
                    ? `
                        <button class="axis-widget-chat-message-button" onclick='_axisWidgetChat.fetchDownloadFile(${JSON.stringify(
                          { ...message.attachment, messageId: message.id }
                        )})'>
                            ${this.Icon.File}
                            ${message.attachment.originalFile} 
                            <span>(${this.getFileSize(message.attachment.size)})</span>
                        </button>
                    `
                    : `<p>${message.text}</p>`
                }
                </div>
                 ${
                   showDate
                     ? `<small>
                    ${new Date(message.date).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}</small>`
                     : ''
                 }
            </div>`
  }

  renderChatMessages() {
    const chatMessages = document.querySelector('.axis-widget-chat-messages')

    const orderedMessages = this.ticketData.messages.reduce((acc, message) => {
      const messageDate = new Date(message.date).toLocaleDateString('pt-BR')

      // Verificar se a data já existe no array acumulador
      const existingDateGroup = acc.find(group => group.date === messageDate)

      if (existingDateGroup) {
        existingDateGroup.messages.push(message)
      } else {
        acc.push({
          date: messageDate,
          messages: [message],
        })
      }

      return acc
    }, [])

    chatMessages.innerHTML = `${orderedMessages
      .map(group => {
        return `
                    <div class="date-group">
                        <div class="date-group-header">${group.date}</div>
                        ${group.messages
                          .map((msg, i) => {
                            const showUserName =
                              msg.userId !== group.messages[i - 1]?.userId &&
                              msg.userId !== this.userData.id
                            const showDate =
                              msg.userId !== group.messages[i + 1]?.userId ||
                              i === group.messages.length - 1
                            return this.ChatMessage(msg, showUserName, showDate)
                          })
                          .join('')}
                        
                    </div>
                `
      })
      .join('')}
            ${this.isLoading ? `<small>Enviando mensagem...${this.Icon.Loading}</small>` : ''}
            `
  }

  scrollChatToBottom() {
    const chatMessages = document.querySelector('.axis-widget-chat-messages')
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  async sendMessage() {
    try {
      this.isLoading = true
      this.renderChatMessages()
      this.scrollChatToBottom()
      const messageInput = document.getElementById('chat-input')
      const fileInput = document.getElementById('file-input')
      const message = messageInput.value
      const file = fileInput.files[0]

      if (!message && !file) return

      const formData = new FormData()
      formData.append('ticketId', this.ticketId)
      formData.append('username', this.userData.name)
      formData.append('userId', this.userData.id)

      if (message) {
        formData.append('text', message)
      }

      if (file) {
        formData.append('file', file)
      }

      messageInput.value = ''
      fileInput.value = ''
      await this.fetchAddComment(formData)
      setTimeout(async () => await this.fetchTicketData(), 1000)
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
      setTimeout(this.renderChatMessages, 100)
      setTimeout(this.scrollChatToBottom, 200)
    }
  }

  renderChatHeaderData() {
    const chatHeaderTitle = document.querySelector('.axis-widget-chat-header h2')
    const chatHeaderFlag = document.querySelector('.axis-widget-chat-header-status')
    chatHeaderTitle.innerHTML = this.ticketData?.title
    chatHeaderFlag.innerHTML = this.ticketData?.opened ? 'Aberto' : 'Fechado'
    chatHeaderFlag.setAttribute('data-type', this.ticketData?.opened ? 'opened' : 'closed')
  }

  getFileSize(bytes) {
    if (typeof bytes === 'string') {
      bytes = parseInt(bytes, 10)
    }

    if (bytes < 0) throw new Error('bytes cannot be negative')

    let humano
    let sufixo

    switch (true) {
      case bytes >= 1152921504606846976:
        humano = bytes / Math.pow(1024, 6)
        sufixo = 'EB'
        break
      case bytes >= 1125899906842624:
        humano = bytes / Math.pow(1024, 5)
        sufixo = 'PB'
        break
      case bytes >= 1099511627776:
        humano = bytes / Math.pow(1024, 4)
        sufixo = 'TB'
        break
      case bytes >= 1073741824:
        humano = bytes / Math.pow(1024, 3)
        sufixo = 'GB'
        break
      case bytes >= 1048576:
        humano = bytes / Math.pow(1024, 2)
        sufixo = 'MB'
        break
      case bytes >= 1024:
        humano = bytes / 1024
        sufixo = 'KB'
        break
      default: // Byte
        return bytes + ' B'
    }

    return humano.toFixed(2) + ' ' + sufixo
  }

  ChatHeader() {
    return `
            <header class="axis-widget-chat-header">
                <div>
                <button type="button" onclick="_axisWidget.setState({currentTab:'home'})">${this.Icon.ChevronLeft}</button>
                    <h2></h2>
                </div>
                <span class="axis-widget-chat-header-status"></span>
            </header>
        `
  }

  renderChatActions() {
    const chatActions = document.querySelector('.axis-widget-chat-actions')
    if (this.ticketData?.opened) {
      chatActions.innerHTML = `
                <button class="axis-widget-chat-actions-file-button" type="button" onclick="document.getElementById('file-input').click()">
                    ${this.Icon.Paperclip}
                </button>
                <input id="chat-input" placeholder="Escreva sua mensagem" autocomplete="off" onkeypress="if(event.key === 'Enter') _axisWidgetChat.sendMessage()" />
                <input type="file" id="file-input" style="display: none;" onchange="_axisWidgetChat.sendMessage()" />
                <button class="axis-widget-chat-actions-send-button" type="button" onclick="_axisWidgetChat.sendMessage()">${this.Icon.Send}</button>
            `
    } else chatActions.innerHTML = ''
  }

  render() {
    const chatWrapper = document.querySelector('#axis-widget-chat-wrapper')
    chatWrapper.innerHTML = `
            ${this.ChatHeader()}
            <main class="axis-widget-chat-messages">${
              this.isLoading ? 'Carregando mensagens...' : ''
            }</main>
            <footer class="axis-widget-chat-actions"></footer>
        `
  }

  destroy() {
    clearInterval(this.intervalId)
    const chatWrapper = document.querySelector('#axis-widget-chat')
    if (chatWrapper) {
      chatWrapper.remove()
    }
  }
}

class AxisWidgetClass {
  constructor({ userName, userEmail, userId, origin, company, data, isOpen }) {
    this.baseUrl = 'https://axis-server.semprocesso.com.br'
    this.user = {
      name: userName,
      email: userEmail,
      id: userId,
      company: company.toLowerCase(),
      origin: origin.toLowerCase(),
      data,
    }

    this.state = {
      isOpen,
      // currentTab:'auth-form', // home, chat, new, auth-form
      currentTab: !userId || !userEmail || !userName ? 'auth-form' : 'home', // home, chat, new, auth-form
      isLoading: true,
      tickets: [],
      selectedTicket: null,
      selectedTicketOpened: true,
      selectedTicketMessages: [],
      token: data.token,
      disclaimer: 'Normalmente responderemos em alguns minutos',
      tags: [],
    }

    this.formFields = {
      title: '',
      description: '',
      priority: 1,
      tags: 'null',
    }

    // if (!userName || !userEmail || !userId || !origin || !company)
    //   throw new Error('Missing required parameters: userName, userEmail, userId, origin, company')

    this.componentWillMount()
    // this.setStyle()
    this.render()
    if (userEmail && userName && userId) this.fetchAuth()
    if (userEmail && userName && userId) {
      setTimeout(() => this.fetchList(), 1000)
    }
  }

  Icon = {
    Chat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    ChevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`,
    ChevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`,
    ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`,
    Home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    Messages: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-messages-square"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>`,
    Send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`,
    SquareChat: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1.5 4.5C0.95 4.5 0.5 4.05 0.5 3.5V1C0.5 0.45 0.95 0 1.5 0H5.5C6.05 0 6.5 0.45 6.5 1V3.5C6.5 4.05 6.05 4.5 5.5 4.5H4.5V6L3 4.5H1.5ZM10.5 7.5C11.05 7.5 11.5 7.05 11.5 6.5V4C11.5 3.45 11.05 3 10.5 3H7.5V3.5C7.5 4.6 6.6 5.5 5.5 5.5V6.5C5.5 7.05 5.95 7.5 6.5 7.5H7.5V9L9 7.5H10.5Z" fill="#00695C"/></svg>`,
    Team: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11 6.61C11 3.865 8.87 2 6.5 2C4.155 2 2 3.825 2 6.64C1.7 6.81 1.5 7.13 1.5 7.5V8.5C1.5 9.05 1.95 9.5 2.5 9.5H3V6.45C3 4.515 4.565 2.95 6.5 2.95C8.435 2.95 10 4.515 10 6.45V10H6V11H10C10.55 11 11 10.55 11 10V9.39C11.295 9.235 11.5 8.93 11.5 8.57V7.42C11.5 7.07 11.295 6.765 11 6.61Z" fill="white"/><path d="M5 7.5C5.27614 7.5 5.5 7.27614 5.5 7C5.5 6.72386 5.27614 6.5 5 6.5C4.72386 6.5 4.5 6.72386 4.5 7C4.5 7.27614 4.72386 7.5 5 7.5Z" fill="white"/><path d="M8 7.5C8.27614 7.5 8.5 7.27614 8.5 7C8.5 6.72386 8.27614 6.5 8 6.5C7.72386 6.5 7.5 6.72386 7.5 7C7.5 7.27614 7.72386 7.5 8 7.5Z" fill="white"/><path d="M9.49998 6.015C9.38076 5.31207 9.01669 4.67398 8.47221 4.21369C7.92773 3.7534 7.23796 3.50059 6.52498 3.5C5.00998 3.5 3.37998 4.755 3.50998 6.725C4.12667 6.47288 4.67134 6.07199 5.09536 5.55811C5.51938 5.04422 5.80956 4.43334 5.93998 3.78C6.59498 5.095 7.93998 6 9.49998 6.015Z" fill="white"/></svg>`,
  }

  emailValidation(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexEmail.test(email)
  }

  componentWillMount() {
    const root = document.querySelector('body')
    const widget = document.createElement('div')
    const widgetChatWrapper = document.createElement('div')
    const widgetFloatIcon = document.createElement('button')

    widget.id = 'axis-widget-root'
    widgetChatWrapper.id = 'axis-widget-chat-wrapper'
    widgetChatWrapper.setAttribute('data-visible', this.state.isOpen)

    widgetFloatIcon.id = 'axis-widget-float-icon'
    const setIcon = () => (this.state.isOpen ? this.Icon.ChevronDown : this.Icon.Chat)
    widgetFloatIcon.innerHTML = setIcon()
    widgetFloatIcon.addEventListener('click', () => {
      this.setState({ isOpen: !this.state.isOpen })
      widgetChatWrapper.setAttribute('data-visible', this.state.isOpen)
      widgetFloatIcon.innerHTML = setIcon()
    })

    root.appendChild(widget)
    widget.appendChild(widgetChatWrapper)
    widget.appendChild(widgetFloatIcon)
  }
  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.render()
  }
  setFormFields(newFormFields) {
    this.formFields = { ...this.formFields, ...newFormFields }
  }

  setStyle() {
    const css = `
      .axis-widget-chat-header h2,.axis-widget-ticket-card p span,.axis-widget-ticket-card p strong{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:root{--axis-w-icon-size:48px;--axis-w-primary-color:#009688;--Brand-Main-super-light:#80cbc3;--Brand-Main-super-dark:#00695c;--axis-w-light-color:rgba(202, 244, 247, 1);--axis-w-b0-color:#ffffff;--axis-w-b1-color:#f8f8f8;--axis-w-b2-color:#dddddd;--axis-w-b3-color:#666666;--axis-text-disabled:#bfbfbf;--axis-shadow:0 5px 20px rgba(35, 35, 35, 0.35);--axis-gradient:linear-gradient(
    135deg,
    rgba(8, 84, 77, 1) 13%,
    rgba(0, 150, 136, 1) 52%,
    rgba(202, 244, 247, 1) 100%
  );--axis-header-bg:#00695c}#axis-widget-root{position:fixed;right:20px;bottom:20px;z-index:999;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end;gap:16px}#axis-widget-float-icon{all:unset;width:var(--axis-w-icon-size);height:var(--axis-w-icon-size);border-radius:50%;background-color:var(--axis-w-primary-color);color:var(--axis-w-b0-color);display:flex;justify-content:center;align-items:center;transition:.1s;cursor:pointer}#axis-widget-float-icon:hover{transform:scale(1.1)}#axis-widget-chat-wrapper{width:400px;max-width:90dvw;border-radius:16px;background-color:var(--axis-w-b0-color);display:none;overflow:hidden;box-shadow:var(--axis-shadow)}#axis-widget-chat-wrapper[data-visible=true]{display:flex;height:500px;flex-direction:column;justify-content:space-between}#axis-widget-chat>footer{display:flex;justify-content:center;gap:32px;padding:16px 32px;background-color:var(--axis-w-b1-color)}#axis-widget-chat>footer>button{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;flex-direction:column;font-size:12px;transition:.1s}#axis-widget-chat>footer>button:hover,#axis-widget-chat>footer>button[data-enable=true]{color:var(--axis-w-primary-color)}.axis-widget-chat-header-welcome{display:flex;align-items:flex-start;padding:16px;gap:16px;font-size:24px;flex-direction:column;font-weight:700;background:var(--Brand-Main-super-dark);color:var(--axis-w-b0-color)}.axis-widget-chat-header-welcome-flags{width:100%;display:flex;align-items:center;justify-content:center;gap:8px}.axis-widget-chat-header-welcome-flags span{display:flex;align-items:center;gap:4px;font-size:10px;font-weight:400;line-height:150%;letter-spacing:.4px;padding:4px 12px;border-radius:50px;background-color:var(--Brand-Main-super-light);color:#00695c}.axis-widget-chat-header-welcome-flags span:nth-child(2){background-color:#009688;color:var(--axis-w-b0-color)}.axis-widget-chat-actions button:hover,.axis-widget-chat-header button{background-color:var(--Brand-Main-super-light)}.axis-widget-chat-header-welcome-title{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;font-size:20px;font-weight:700;line-height:120%}.axis-widget-chat-header-welcome-title span:first-child{font-size:16px;font-weight:400;line-height:150%;letter-spacing:.5px}.axis-widget-chat-header-welcome hr{width:100%;border:1px solid #007969;margin:0}.axis-widget-chat-header-welcome-infos{width:100%;font-size:12px;font-weight:500;line-height:150%;letter-spacing:-.04px;display:flex;flex-direction:column;align-items:center;justify-content:center}.axis-widget-chat-header-welcome-infos small{font-size:12px;font-weight:400;color:var(--axis-text-disabled)}.axis-widget-chat-header{background:var(--axis-header-bg);color:var(--axis-w-b0-color);padding:16px;display:flex;place-items:center;justify-content:space-between;font-size:14px;font-weight:600;gap:8px}.axis-widget-chat-header h2{font-size:14px;font-weight:600}.axis-widget-chat-header div{display:flex;align-items:center;gap:8px;overflow:hidden}.axis-widget-chat-header button{width:20px;height:20px;aspect-ratio:1/1;border-radius:50px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;cursor:pointer}.axis-widget-chat-actions:empty,.axis-widget-chat-header button:disabled{display:none}.axis-widget-chat-header button svg{width:16px;height:16px;color:#1b1b1b}.axis-widget-chat-header-status{background-color:#81d5ff;color:#3b3b3b;font-size:10px;font-weight:400;line-height:150%;letter-spacing:.4px;padding:2px 8px;border-radius:50px}.axis-widget-chat-header-status[data-type=closed]{background-color:var(--axis-w-b3-color);color:var(--axis-text-disabled)}.axis-widget-ticket-list{flex-grow:1;overflow-y:scroll;overflow-x:hidden;display:flex;flex-direction:column;align-items:center;gap:8px;padding:0 8px 16px 16px;font-size:14px}.axis-widget-chat-messages::-webkit-scrollbar,.axis-widget-ticket-list::-webkit-scrollbar{display:block;background:0 0;width:16px}.axis-widget-chat-messages::-webkit-scrollbar-thumb,.axis-widget-ticket-list::-webkit-scrollbar-thumb{border:5px solid transparent;background-clip:padding-box;border-radius:9999px;background-color:var(--axis-w-b2-color)}.axis-widget-ticket-list-message{color:var(--axis-w-b3-color);flex:1;display:flex;align-items:center}.axis-widget-ticket-list-title{font-size:14px;font-weight:600;width:100%;position:sticky;top:0;background:var(--axis-w-b0-color);margin-top:24px;z-index:1;padding:8px 0 4px;box-shadow:0 5px 5px #fff}.axis-widget-ticket-card{all:unset;display:flex;gap:16px;align-items:center;padding:8px 16px;border-radius:8px;font-size:14px;cursor:pointer;background-color:#fafafa;border:1px solid #f2f2f2;width:100%;box-sizing:border-box}.axis-widget-ticket-card p{display:flex;flex-direction:column;align-items:flex-start;width:100%;overflow:hidden}.axis-widget-ticket-card p strong{font-size:14px;font-weight:600;color:#1c1c1c;max-width:100%}.axis-widget-ticket-card p span{opacity:.75;font-size:12px;width:100%;color:#757474}.axis-widget-ticket-card-icon-content{background-color:#009688;padding:3px;aspect-ratio:1/1;border-radius:50px;width:20px;height:20px;display:flex;align-items:center;justify-content:center}.axis-widget-ticket-card-icon-content svg{width:16px;height:16px;color:var(--axis-w-b0-color)}.axis-widget-ticket-card[data-opened=false]{opacity:.5;color:var(--axis-w-b3-color)}.axis-widget-ticket-card[data-opened=false] .axis-widget-ticket-card-icon-content{background-color:var(--axis-text-disabled)}.axis-widget-chat-messages{flex-grow:1;overflow-y:scroll;overflow-x:hidden;display:flex;flex-direction:column;gap:8px;padding:16px 16px 16px 32px}.axis-widget-chat-message,.date-group-header{padding:8px 16px;border-radius:8px;width:fit-content}.axis-widget-chat-messages small{display:flex;justify-content:flex-end;align-items:flex-end;font-size:10px;gap:8px}.axis-widget-chat-messages small svg{width:12px;height:12px;color:var(--axis-w-primary-color);animation:1s linear infinite spin}.date-group{display:flex;flex-direction:column;gap:8px}.axis-widget-chat-message,.axis-widget-chat-message-container{flex-direction:column;display:flex}.date-group-header{background-color:var(--axis-w-b2-color);margin:8px auto 0;font-size:10px}.axis-widget-chat-message{align-self:flex-end;background-color:var(--axis-w-light-color);margin-left:auto}.axis-widget-chat-message strong{align-self:flex-end;font-size:12px;font-weight:500;color:var(--axis-w-primary-color)}.axis-widget-chat-message-container small{display:flex;flex-direction:column;align-items:flex-end;font-size:10px}.axis-widget-chat-message p{font-size:14px;color:var(--axis-w-b3-color)}.axis-widget-chat-message[data-from-user=false]{background-color:var(--axis-w-b2-color);color:var(--axis-w-b3-color);align-self:flex-start;margin-left:0}.axis-widget-chat-message-container[data-from-user=false] small,.axis-widget-chat-message[data-from-user=false] strong{align-self:flex-start;align-items:flex-start}.axis-widget-chat-message-button{display:flex;align-items:flex-start;padding:4px;gap:4px;font-size:14px;background:0 0;color:var(--axis-w-primary-color);border-radius:4px;cursor:pointer}.axis-widget-chat-message-button svg{width:16px;height:16px}.axis-widget-chat-message-button span{color:var(--axis-w-b3-color)}.axis-widget-chat-message-button span svg{animation:1s linear spin}.axis-widget-chat-actions{display:flex;gap:16px;align-items:center;padding:8px 16px;background-color:var(--axis-w-b0-color);border:1px solid var(--axis-w-b2-color);font-size:14px}.axis-widget-chat-actions input{font-size:14px;font-weight:400;line-height:150%;letter-spacing:.4px;box-sizing:border-box;border:none;width:100%}.axis-widget-chat-actions button{padding:8px;border-radius:4px}.axis-widget-chat-actions button:hover svg{color:var(--Brand-Main-super-dark)}.axis-widget-chat-actions-file-button{all:unset;cursor:pointer;display:flex;align-items:center;gap:8px;font-size:14px;border-radius:80px;color:var(--axis-w-b3-color);transition:.1s}.axis-widget-chat-actions-file-button svg{width:16px;height:16px;color:var(--Brand-Main-super-light)}.axis-widget-chat-actions-send-button{all:unset;cursor:pointer;display:flex;align-items:center;color:var(--axis-w-b3-color);transition:.1s}.axis-widget-chat-actions-send-button svg{width:16px;height:16px;color:var(--axis-w-primary-color)}.axis-widget-form{display:flex;flex-direction:column;padding:16px;gap:20px;height:100%}.axis-widget-form label{display:flex;flex-direction:column;gap:4px;width:100%;font-size:10px;position:relative;border:1px solid #b5b5b5;box-sizing:border-box;padding-right:10px}.axis-widget-form label span{position:absolute;padding:0 4px;top:-7px;left:10px;background-color:var(--axis-w-b0-color)}.axis-widget-form input,.axis-widget-form select{border:none;color:#6d6d6d;padding:10px 0 10px 10px}.axis-widget-form-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;width:100%;margin-top:auto}.axis-widget-form-footer button{height:100%;font-size:10px;font-weight:400;line-height:150%;letter-spacing:.4px;background:0 0;cursor:pointer;transition:.3s}.axis-widget-form-footer button[data-type=submit]{display:flex;align-items:center;justify-content:center;gap:16px;padding:8px;background-color:var(--axis-w-primary-color);color:var(--axis-w-b0-color);border-radius:4px;font-size:12px;font-weight:500;line-height:100%;cursor:pointer;margin-left:auto}.axis-widget-form button:disabled{background-color:var(--axis-w-b3-color);cursor:default}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    `
    const style = document.createElement('style')
    style.innerHTML = css
    document.head.appendChild(style)
  }
  fetchAuth() {
    fetch(`${this.baseUrl}/users/guest/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.user.name,
        email: this.user.email,
        userId: this.user.id,
        company: this.user.company,
        origin: this.user.origin,
      }),
    })
      .then(response => response.json())
      .then(state => {
        this.setState(state)
      })
      .catch(error => {
        console.error(error)
      })
  }

  fetchCreate() {
    const body = JSON.stringify({
      ...this.formFields,
      userId: this.user.id,
      text: this.user.text,
      origin: this.user.origin,
      company: this.user.company,
    })

    fetch(`${this.baseUrl}/tickets/create`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: this.state.token,
      },
      body,
    })
      .then(response => response.json())
      .then(() => {
        this.setFormFields({
          title: '',
          description: '',
          priority: 1,
          tags: [],
        })

        this.fetchList()

        this.setState({ currentTab: 'home' })
      })
      .catch(error => {
        console.error(error)
      })
  }

  fetchValidateAuth() {
    this.user.name = this.formFields.userName
    this.user.email = this.formFields.userEmail

    this.fetchAuth()
    setTimeout(() => this.fetchList(), 1000)
    setTimeout(() => this.setState({ currentTab: 'home' }), 1500)
  }

  fetchList() {
    if (this.state.token?.length === 0) return
    this.setState({ isLoading: true })
    fetch(`${this.baseUrl}/tickets/list`, {
      method: 'POST',
      headers: {
        authorization: this.state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        params: { origin: this.user.origin },
      }),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ tickets: json, isLoading: false })
      })
      .then(() => this.refreshTicketList())
      .catch(error => {
        this.setState({ isLoading: false })
        console.error(error)
      })
  }
  fetchChat(params) {
    fetch(`${this.baseUrl}/tickets/${params}`)
      .then(response => response.json())
      .then(json => this.setState({ selectedTicketMessages: json.messages }))
      .catch(error => {
        console.error(error)
      })
  }

  WelcomeHeader() {
    const name = this.user?.name?.split(' ')[0] || '👋'
    return `
        <header class="axis-widget-chat-header-welcome">
            <div class="axis-widget-chat-header-welcome-flags">
                <span> ${this.Icon.SquareChat} Chat</span>
            </div>
            <div class="axis-widget-chat-header-welcome-title">
                <span>Olá ${name}</span>
                <span>Como podemos ajudar você?</span>
            </div>
            <hr/>
            <div class="axis-widget-chat-header-welcome-infos">
                <small>Horário de funcionamento</small>
                <strong>09:00 às 18:00, exceto nos finais de semana</strong>
            </div>
        </header>`
  }
  TicketCard({ title, description, icon, opened, id, currentTab = 'chat' }) {
    let func = `_axisWidget.setState({currentTab:'${currentTab}',selectedTicket:'${id}',selectedTicketOpened:${opened},selectedTicketMessages:[]});`
    return `<button type="button" class="axis-widget-ticket-card" data-opened="${opened}" onclick="${func}" >
        <p><strong>${title}</strong><span>${description}</span></p>
        <div class="axis-widget-ticket-card-icon-content">${icon}</div>
      </button>`
  }

  refreshTicketList() {
    const ticketList = document.querySelector('.axis-widget-ticket-list')

    if (this.state.tickets.length > 0)
      return (ticketList.innerHTML = `
            <strong class="axis-widget-ticket-list-title">Últimos tickets</strong>
            ${this.state.tickets
              .map(({ title, tag, id, opened }) =>
                this.TicketCard({
                  id,
                  title,
                  description: `${id} - ${tag}`,
                  opened,
                  icon: this.Icon.ChevronRight,
                })
              )
              .join('')}
        `)
    else
      return (ticketList.innerHTML = `
            <small class="axis-widget-ticket-list-message">Nenhum ticket encontrado</small>
        `)
  }

  TicketList() {
    function renderContent() {
      if (this.state.isLoading)
        return '<small class="axis-widget-ticket-list-message">Carregando...</small>'
      if (this.state.tickets.length > 0)
        return `
            <strong class="axis-widget-ticket-list-title">Últimos tickets</strong>
            ${this.state.tickets
              .map(({ title, tag, id, opened }) =>
                this.TicketCard({
                  id,
                  title,
                  description: `${id} - ${tag}`,
                  opened,
                  icon: this.Icon.ChevronRight,
                })
              )
              .join('')}
            `
      return '<small class="axis-widget-ticket-list-message">Nenhum ticket encontrado</small>'
    }
    return `
        <main class="axis-widget-ticket-list">
          ${renderContent.call(this)}
        </main>
      `
  }
  ChatHeader() {
    return `<header class="axis-widget-chat-header">
        <div>
            <button 
              type="button" 
              onclick="_axisWidget.setState({currentTab:'home'})" 
              ${this.state.currentTab === 'auth-form' ? 'disabled' : ''}>
              ${this.Icon.ChevronLeft}
            </button>
            <span>${this.state.currentTab === 'auth-form' ? 'Autenticação' : 'Novo ticket'} ${
      this.state.selectedTicket ?? ''
    }</span>
        </div>
      </header>`
  }
  ChatMessage(message) {
    const fromUser = message.userType === 'user'
    return `<div class="axis-widget-chat-message" data-from-user="${fromUser}">${message.text}</div>`
  }
  ChatMessages() {
    return `<main class="axis-widget-chat-messages">
        ${this.state.selectedTicketMessages?.map(message => this.ChatMessage(message)).join('')}
        </main>`
  }
  ChatActions() {
    return `<footer class="axis-widget-chat-actions">
        <input type="text" placeholder="Escreva sua mensagem" />
        <button type="button">${this.Icon.Send}</button>
      </footer>`
  }

  handleCancelForm() {
    this.setFormFields({ title: '', tags: 'null' })
    this.setState({ currentTab: 'home' })
  }

  isBusinessHours() {
    const now = new Date()

    const dayOfWeek = now.getDay()

    const currentHour = now.getHours()

    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5
    const isWithinHours = currentHour >= 9 && currentHour < 18

    return isWeekday && isWithinHours
  }

  updateNewTicketButton() {
    const input = document.querySelector('.axis-widget-form input')
    const select = document.querySelector('.axis-widget-form select')
    const button = document.querySelector('.axis-widget-submit-ticket-button')

    if (!input || !select || !button) return

    if (input.value.length < 3 || select.value === 'null' || select.value === '') {
      button.disabled = true
    } else {
      button.disabled = false
    }
  }

  updateAuthForm() {
    const name = document.querySelector("input[name='userName']")
    const email = document.querySelector("input[name='userEmail']")
    const button = document.querySelector('.axis-widget-submit-auth-button')

    const isValidEmail = this.emailValidation(email.value)

    if (!name || !email || !button) {
      console.log({ name, email, button })
      return null
    }

    if (name.value.length < 3 || !isValidEmail) {
      button.disabled = true
    } else {
      button.disabled = false
    }
  }

  NewTicketForm() {
    return `<form class="axis-widget-form">
            <label>
                <span>Título do Problema</span>
                <input 
                    type="text" 
                    placeholder="Digite um título breve para o problema" 
                    onkeyup="_axisWidget.setFormFields({title: this.value})"
                    maxlength="140"
                    name="title"
                    oninput="_axisWidget.updateNewTicketButton()" 
                    value="${this.formFields.title || ''}"
                />
            </label>
            <label>
                <span>Assunto</span>
                <select name="tag" 
                    onmouseup="_axisWidget.setFormFields({tags: this.value})" 
                    onchange="_axisWidget.updateNewTicketButton()">
                    <option value='null'>Selecione um assunto</option>
                    ${this.state.tags
                      .map(
                        tag => `
                        <option value='${tag}' ${
                          this.formFields.tags === tag ? 'selected' : ''
                        }>${tag}</option>
                    `
                      )
                      .join('')}
                </select>
            </label>
            
            <footer class="axis-widget-form-footer">
                <button type="button"onclick="_axisWidget.handleCancelForm()">Cancelar</button>
                <button class="axis-widget-submit-ticket-button" type="button" data-type="submit"
                    onclick="_axisWidget.fetchCreate()" disabled>
                    Criar novo ticket
                </button>
            </footer>
            
        </form>`
  }

  AuthForm() {
    return `<form class="axis-widget-form">
            <label>
                <span>Nome</span>
                <input 
                    type="text" 
                    placeholder="Digite o seu nome" 
                    onkeyup="_axisWidget.setFormFields({userName: this.value})"
                    maxlength="140"
                    name="userName"
                    oninput="_axisWidget.updateAuthForm()" 
                />
            </label>
            <label>
                <span>Email</span>
                <input 
                    type="text" 
                    placeholder="Digite o seu email" 
                    onkeyup="_axisWidget.setFormFields({userEmail: this.value})"
                    maxlength="140"
                    name="userEmail"
                    oninput="_axisWidget.updateAuthForm()" 
                />
            </label>
            
            <footer class="axis-widget-form-footer">
                <button class="axis-widget-submit-auth-button" type="button" data-type="submit"
                    onclick="_axisWidget.fetchValidateAuth()" disabled>
                    Avançar
                </button>
            </footer>
            
        </form>`
  }

  render() {
    const { currentTab, selectedTicket } = this.state
    const widgetChat = document.querySelector('#axis-widget-chat-wrapper')

    if (currentTab === 'home') {
      widgetChat.innerHTML = `
            ${this.WelcomeHeader()}
            ${this.TicketCard({
              title: 'Iniciar uma nova conversa',
              description: this.state.disclaimer,
              id: '',
              opened: true,
              icon: this.Icon.Send,
              currentTab: 'new',
            })}
            ${this.TicketList()}`
    } else if (currentTab === 'auth-form') {
      widgetChat.innerHTML = `
                ${this.ChatHeader()}
                ${this.AuthForm()}
            `
    } else if (currentTab === 'chat' && selectedTicket) {
      if (window._axisWidgetChat) _axisWidgetChat.destroy()
      window._axisWidgetChat = new AxisWidgetChat(selectedTicket, this.state.token, this.user)
    } else if (currentTab === 'new') {
      widgetChat.innerHTML = `
                ${this.ChatHeader()}
                ${this.NewTicketForm()}
            `
    }
  }
}

function AxisWidget({ userName, userEmail, userId, origin, company, data = {}, isOpen = false }) {
  window._axisWidget = new AxisWidgetClass({
    userName,
    userEmail,
    userId,
    origin,
    company,
    data,
    isOpen,
  })
}

window.AxisWidget = AxisWidget
