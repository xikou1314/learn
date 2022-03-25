import AES from 'crypto-js/aes.js'
import encUtf8 from 'crypto-js/enc-utf8.js'
import ModeEcb from 'crypto-js/mode-ecb.js'
// import Pkcs7 from 'crypto-js/pad-pkcs7.js'
const iv = encUtf8.parse('123646462737')
const key = encUtf8.parse('tesfsdfsdfsdhfj21313')
class AESClass {
  aesEncrypt(content){
      const srcs = encUtf8.parse(content);
      const encrypted = AES.encrypt(srcs, key.toString(encUtf8), {
        iv,
        mode: ModeEcb,
      });
      return encrypted.toString();
    }
    aesDecrypt(content){
      const decrypt = AES.decrypt(content, key.toString(encUtf8), {
        iv,
        mode: ModeEcb,
      });
      const decryptedStr = decrypt.toString(encUtf8);
      return decryptedStr.toString();
    }
}
const aes = new AESClass()
let aaa = aes.aesEncrypt('123测试速度')
console.log(aaa)
console.log(aes.aesDecrypt(aaa))