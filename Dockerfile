FROM Sithuwa-bot/Sithum_Kalhara
 
RUN git clone https://github.com/Sithuwa/SITHUWA-BOT-1 /root/sithuwabot
WORKDIR /root/sithuwabot/
ENV TZ=Europe/Istanbul
RUN yarn add supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
