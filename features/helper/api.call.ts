// import { randomNumber } from './data'
// import { sha256 } from 'js-sha256'

// const { getClient } = require('../helper/connect.db.ts')

// const CIAM_URL = process.env['CIAM_URL'] as string
// const TRX_URL = process.env['TRX_URL'] as string
// const DATA_MOBILE = process.env['DATA_MOBILE'] as string
// const TRX_URL_MOBILE = process.env['TRX_URL_MOBILE'] as string
// const CIAM_URL_MOBILE = process.env['CIAM_URL_MOBILE'] as string
// const H2H_URL_MOBILE = process.env['H2H_URL_MOBILE'] as string

// export async function loginAdminApi(email: string): Promise<string> {
//     // step 1 : get otpToken
//     const loginAdmin = await fetch(CIAM_URL + '/auth/sign-in-backoffice', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             email: email,
//             passwd: 'Rahasia123!',
//         }),
//     })
//     const loginAdminData = await loginAdmin.json()
//     const otpToken = loginAdminData.data.otpToken

//     // step 2 : get otp via db
//     const client = await getClient()

//     async function getOTP(): Promise<string> {
//         try {
//             const res = await client.query('SELECT otp_code FROM ciam.ciam_user_backoffice_login WHERE email = $1', [email])
//             const otp = res.rows[0].otp_code

//             await client.end()

//             return otp
//         } catch (err) {
//             console.error(err)
//             return ''
//         }
//     }

//     const otpCode = await getOTP()

//     // Step 3 : validate admin otp using API call
//     const validateOtp = await fetch(CIAM_URL + '/salman/auth/validate-otp-login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             email: email,
//             otp: otpCode,
//             otpToken: otpToken,
//         }),
//     })

//     const validateOTPData = await validateOtp.json()
//     const adminAccessToken = validateOTPData.data.accessToken

//     return adminAccessToken
// }

// export async function changePasswordApi(username: string) {
//     //login for get token
//     const login = await fetch(CIAM_URL + '/auth/sign-in', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             passwd: 'Asdf1234',
//             deviceInfo: [
//                 {
//                     deviceId: 'e70d44924172de88'
//                 }
//             ]
//         }),
//     })
//     const loginData = await login.json()
//     const token = loginData.data.accessToken

//     // change password
//     const changePassword = await fetch(CIAM_URL + '/auth/change-password', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({
//             passwd: 'Asdf1234',
//             newPasswd: 'Qwerty123'
//         }),
//     })
//     expect(changePassword.status).toEqual(200)
//     const changePasswordData = await changePassword.json()
//     console.log(changePasswordData.statusDescription)
//     expect(changePasswordData.statusDescription).toEqual('Success Change Password')
// }

// export async function deleteUsernameApi(username: string) {
//     const accessToken = await loginAdminApi('miguty@abyssmail.com')
//     console.log('the access token is: ' + accessToken)
//     const deleteUser = await fetch(CIAM_URL + '/customers-backoffice/' + username, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Platform': 'BACKOFFICE',
//             'Authorization': 'Bearer ' + accessToken
//         }
//     })

//     if (deleteUser.status == 200 || deleteUser.status == 404) {
//         console.log('user has been deleted')
//     } else {
//         throw new Error('failed, status = ' + deleteUser.status)
//     }
//     const data = await deleteUser.json()
//     console.log(data)
// }

// export async function checkDanamonConfig() {
//     const configDanamon = await fetch(DATA_MOBILE + '/config?' + new URLSearchParams({
//         keys: 'is_danamon_active'
//     }),
//     {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     return configDanamon.json()
// }

// export async function checkToogleVaNumber() {
//     const configDanamon = await fetch(DATA_MOBILE + '/config?' + new URLSearchParams({
//         keys: 'va_concatenation_toggle'
//     }),
//     {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     return configDanamon.json()
// }

// export async function detailDeposit(token: string, phoneNumber: string, codeSetor: string) {
//     const detailDepositResponse = await fetch(TRX_URL + '/salman/teller/deposit/find-by-deposit-code?' + new URLSearchParams({
//         'mobile-phone-number': phoneNumber,
//         'deposit-code': codeSetor
//     }),
//     {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         }
//     })
//     return detailDepositResponse.json()
// }

// export async function submitPersonalDeposit(token: string, formId: string) {
//     const configSubmit = await fetch(TRX_URL + '/salman/customer/deposit', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             formId: formId,
//             customerType: 'ACCOUNT_OWNER'
//         }),
//     })
//     return configSubmit.json()
// }

// export async function approveSupervisor(token: string, formId: string) {
//     const configApprove = await fetch(TRX_URL + '/salman/deposit/supervisor/approve/' + formId, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//     })
//     return configApprove.json()
// }

// export async function approveTellerDeposit(token: string, formId: string) {
//     const configApprove = await fetch(TRX_URL + '/salman/bprs/transfer-form/approval-transfer', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             idNumberVerified: true,
//             dobVerified: true,
//             motherNameVerified: true,
//             mobileNumberVerified: true,
//             transferFormId: formId,
//             idPhotoVerified: true,
//             addressVerified: true,
//             signatureVerified: true
//         }),
//     })
//     return configApprove.json()
// }

// export async function declineDeposit(token: string, formId: string) {
//     const configDecline = await fetch(TRX_URL + '/salman/bprs/transfer-form/decline-transfer/' + formId, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         }
//     })
//     return configDecline.json()
// }

// export async function submitRepresentativeDeposit(token: string, formId: string) {
//     const configSubmit = await fetch(TRX_URL + '/salman/customer/deposit', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             formId: formId,
//             customerType: 'REPRESENTATIVE',
//             ktpNo: '3560231417910001',
//             phoneNumber: '085608120813',
//             notes: 'deposit yang diwakilkan oleh orang lain',
//             purpose: 'Transaksi',
//             name: 'Jhon Doe',
//             relationship: 'Anak',
//             sourceOfFund: 'Gaji'
//         }),
//     })
//     return configSubmit.json()
// }

// export async function emailVerification(email: string) {
//     // get username of the email first
//     const client = await getClient()

//     async function getUserAndToken(): Promise<{ username: string, userId: number, generatedToken: string }> {
//         try {
//             const res = await client.query('SELECT username,user_id FROM ciam.user_login WHERE email = $1', [email])
//             const username = res.rows[0].username
//             const userId = res.rows[0].user_id

//             const res2 = await client.query('SELECT generated_token FROM ciam.verification_token WHERE user_id = $1', [userId])
//             const generatedToken = res2.rows[0].generated_token

//             await client.end()

//             return { username, userId, generatedToken }
//         } catch (err) {
//             console.error(err)
//             return { username: '', userId: -1, generatedToken: '' }
//         }
//     }

//     const { username, userId, generatedToken } = await getUserAndToken()
//     console.log('the username is : ' + username)
//     console.log('the user ID is : ' + userId)
//     console.log('the token is : ' + generatedToken)

//     //verify the email
//     const verifyEmail = await fetch(CIAM_URL + '/verify/email-verification?token=' + generatedToken, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     expect(verifyEmail.status).toEqual(200)
// }

// export async function changeEmailVerificationApi(username: string) {
//     // get username of the email first
//     const client = await getClient()

//     async function getUserAndToken(): Promise<{ userId: number, generatedToken: string }> {
//         try {
//             const res = await client.query('SELECT user_id FROM ciam.user_login WHERE username = $1', [username])
//             const userId = res.rows[0].user_id

//             const res2 = await client.query('SELECT generated_token FROM ciam.verification_token WHERE user_id = $1', [userId])
//             const generatedToken = res2.rows[0].generated_token

//             await client.end()

//             return { userId, generatedToken }
//         } catch (err) {
//             console.error(err)
//             return { userId: -1, generatedToken: '' }
//         }
//     }

//     const { userId, generatedToken } = await getUserAndToken()
//     console.log('the user ID is : ' + userId)
//     console.log('the token is : ' + generatedToken)

//     //verify the email
//     const verifyEmail = await fetch(CIAM_URL + '/verify/change-email-verification?token=' + generatedToken, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     expect(verifyEmail.status).toEqual(200)
// }

// export async function changeEmailApi(username: string, newEmail: string) {
//     const login = await fetch(CIAM_URL + '/auth/sign-in', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             passwd: 'Qwerty123',
//             deviceInfo: [
//                 {
//                     deviceId: 'e70d44924172de88'
//                 }
//             ]
//         }),
//     })
//     const loginData = await login.json()
//     const token = loginData.data.accessToken

//     // change password
//     const changeEmail = await fetch(CIAM_URL + '/update/email', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({
//             email: newEmail,
//             noKtp: '3174111122223333',
//             namaIbuKandung: 'Siti'
//         }),
//     })
//     expect(changeEmail.status).toEqual(200)
//     await changeEmailVerificationApi(username)
// }

// export async function changePhoneNumberApi(username: string, oldPhoneNum: string, newPhoneNum: string) {
//     //login for get token
//     const login = await fetch(CIAM_URL + '/auth/sign-in', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             passwd: 'Qwerty123',
//             deviceInfo: [
//                 {
//                     deviceId: 'e70d44924172de88'
//                 }
//             ]
//         }),
//     })
//     const loginData = await login.json()
//     const token = loginData.data.accessToken

//     // change password
//     const changePhoneNum = await fetch(CIAM_URL + '/update/phone-number', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({
//             noHp: newPhoneNum,
//             noKtp: '3174111122223333',
//             namaIbuKandung: 'Siti'
//         }),
//     })
//     expect(changePhoneNum.status).toEqual(200)

//     // get OTP from db
//     const client = await getClient()

//     async function getOTP(): Promise<string> {
//         try {
//             const res = await client.query('SELECT user_id FROM ciam.user_login WHERE no_hp = $1', [oldPhoneNum])
//             const userId = res.rows[0].user_id

//             const res2 = await client.query('SELECT generated_token FROM ciam.otp_token where user_id  = $1', [userId])
//             const otp = res2.rows[0].generated_token
//             await client.end()

//             return otp
//         } catch (err) {
//             console.error(err)
//             return ''
//         }
//     }

//     const otp = await getOTP()

//     //verify with otp
//     const verifyOtp = await fetch(CIAM_URL + '/update/otp-verification', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({
//             otp: otp
//         }),
//     })
//     expect(verifyOtp.status).toEqual(200)
//     const verifyOtpData = await verifyOtp.json()
//     console.log(verifyOtpData.statusDescription)
//     expect(verifyOtpData.statusDescription).toEqual('Success verify OTP')
// }

// export async function detailWithdrawal(token: string, phoneNumber: string, codeSetor: string) {
//     const detailWithdrawalResponse = await fetch(TRX_URL + '/salman/withdrawal/mobile-code?' + new URLSearchParams({
//         'phone': phoneNumber,
//         'code': codeSetor
//     }),
//     {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         }
//     })
//     return detailWithdrawalResponse.json()
// }

// export async function submitPersonalWithdrawal(token: string, formId: string) {
//     const configSubmit = await fetch(TRX_URL + '/salman/customer/withdrawal', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             formId: formId,
//             customerType: 'ACCOUNT_OWNER'
//         }),
//     })
//     return configSubmit.json()
// }

// export async function approveTellerWithdrawal(token: string, formId: string) {
//     const configApprove = await fetch(TRX_URL + '/salman/withdrawal/' + formId + '/teller/approve', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             idNumberVerified: true,
//             idPhotoVerified: true,
//             signatureVerified: true,
//             mobileNumberVerified: true,
//             dobVerified: true,
//             motherNameVerified: true,
//             addressVerified: true,
//             ktpOwnerVerified: true,
//             ktpRepresentativeVerified: false,
//             suratKuasaVerified: true

//         }),
//     })
//     return configApprove.json()
// }

// export async function approveSupervisorWithdraw(token: string, formId: string) {
//     const configApprove = await fetch(TRX_URL + '/salman/withdrawal/' + formId + '/supervisor/approve', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//     })
//     return configApprove.json()
// }

// export async function ppobTeamApprove(token: string, trxNo: string, status: string): Promise<string> {
//     const approveTeamPPOB = await fetch(TRX_URL + '/salman/ppob/transaction/update',
//         {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Platform': 'BACKOFFICE',
//                 'Authorization': 'Bearer ' + token
//             },
//             body: JSON.stringify({
//                 transactionId: trxNo,
//                 status: status
//             }),
//         })
//     return approveTeamPPOB.json()
// }

// export async function ppobSupervisorApprove(token: string, trxNo: string) {
//     const approveSupervisor = await fetch(TRX_URL + '/salman/ppob/transaction/supervisor/approve/' + trxNo,
//         {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + token,
//                 'Platform': 'BACKOFFICE'
//             }
//         })
//     return approveSupervisor.json()
// }

// export async function submitTransferHijraTeller(token: string, sendAccNumber: string, receiveAccNumber: string, amount: string) {
//     const submitTransfer = await fetch(TRX_URL + '/salman/bprs/transfer-form/submit-transfer-hijra-bank', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             senderIdentity: sendAccNumber,
//             recipientIdentity: receiveAccNumber,
//             amount: amount,
//             notes: 'Testing',
//         }),
//     })
//     return submitTransfer.json()
// }

// export async function submitTransferOtherBankTeller(token: string, sendAccNumber: string, receiveAccNumber: string, amount: string) {
//     const submitTransfer = await fetch(TRX_URL + '/salman/bprs/transfer-form/submit-transfer-other-bank', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         },
//         body: JSON.stringify({
//             senderIdentity: sendAccNumber,
//             recipientIdentity: receiveAccNumber,
//             amount: amount,
//             notes: 'Testing',
//         }),
//     })
//     return submitTransfer.json()
// }

// export async function submitTransferHijraMobile(token: string, receiveAccNumber: string, amount: string) {
//     const submitTransfer = await fetch(TRX_URL_MOBILE + '/internal-transfer', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//         },
//         body: JSON.stringify({
//             identity: receiveAccNumber,
//             nominal: amount,
//             notes: 'Testing',
//             pin: '111111',
//             favorite: true
//         }),
//     })
//     return submitTransfer.json()
// }

// export async function depositFromDanamon(receiveAccNumber: string, receiveName: string, amount: string) {
//     let refNo = '7900' + await randomNumber(100000)
//     console.log(refNo)
//     let generateHash = sha256('PAY_VA_BILL' + refNo + receiveAccNumber + amount + 'BD!U@7H17Ra')
//     console.log(generateHash)
//     const submitDeposit = await fetch(TRX_URL_MOBILE + '/va/h2h/payment', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             PayBillRq: {
//                 service_code: 'PAY_VA_BILL',
//                 user_ref_no: refNo,
//                 bin_no: '7800',
//                 bin_title: 'Danamon',
//                 va_no: receiveAccNumber,
//                 va_name: receiveName,
//                 bill_amount: amount,
//                 pay_amount: amount,
//                 auth_code: generateHash,
//                 pay_account: '011||003500123456',
//                 pay_bank: 'Danamon',
//                 pay_desc: 'payment for bill 1'
//             }
//         }),
//     })
//     return submitDeposit.json()
// }

// export async function depositFromPermata(receiveAccNumber: string, amount: string) {
//     var m = new Date()
//     var dateString = m.getFullYear() + '-' + (m.getMonth() + 1) + '-' + m.getUTCDate() + 'T' + m.getHours() + ':' + m.getMinutes() + ':00+07:00'
//     const submitDeposit = await fetch(H2H_URL_MOBILE + '/PayBill', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Hijra-key': 'Bismillah123!'
//         },
//         body: JSON.stringify({
//             PayBillRq: {
//                 VI_VANUMBER: receiveAccNumber,
//                 VI_TRACENO: '79' + await randomNumber(10000),
//                 VI_TRNDATE: dateString,
//                 VI_DELCHANNEL: '099',
//                 VI_CCY: '360',
//                 INSTCODE: '7286',
//                 BILL_AMOUNT: amount
//             }
//         }),
//     })
//     return submitDeposit.json()
// }

// export async function processTransfer(token: string, formId: string) {
//     const processTf = await fetch(TRX_URL + '/salman/bprs/transfer-form/process/' + formId, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token,
//             'Platform': 'BACKOFFICE'
//         }
//     })
//     return processTf.json()
// }

// export async function loginMobile(username: string) {
//     //login for get token
//     const login = await fetch(CIAM_URL_MOBILE + '/auth/sign-in', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             passwd: 'Password123',
//             deviceInfo: [
//                 {
//                     deviceId: 'f2d0fe4850d346d2'
//                 }
//             ]
//         }),
//     })
//     const loginData = await login.json()
//     const token = loginData.data.accessToken
//     return token
// }

