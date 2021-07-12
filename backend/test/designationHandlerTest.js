// const assert = require('chai').assert;
// const Boom = require('@hapi/boom');
// const {fetchAllDesignations,fetchDesignationById,addDesignation,updateDesignationById,fileTest} = require('../handlers/designation')
// const {fetchDesignationByIdValidation,addDesignationValidation,updateDesignationByIdValidation,fileTestValidation} = require('../validations/designation')
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
// const Server=require('../server')


//   describe('hooks', function() {
//     before(function() {
//         console.log('Before')
//       // runs once before the first test in this block
//       Server.init()
//     });
  
//     after(function() {
//         console.log('After')
//       // runs once after the last test in this block
//     });
  
//     beforeEach(function() {
//         console.log('Before Each')
//       // runs before each test in this block
//     });
  
//     afterEach(function() {
//         console.log('After Each')
//       // runs after each test in this block
//     });
  
//     // test cases

//     describe('designation route', function() {
        
//         describe('for fetchAllDesignations', function() {
//             it("should return status 200", async () => {
//                 let res = await chai
//                     .request(fetchAllDesignations)
//                     .get('/designation')
//                 expect(res.status).to.equal(200)
               
//             })
//         });
//       });

//     //   describe('GET /designation', () => {
//     //     it('should return the server status', async done => {
//     //       await testUtil(async () => {
//     //         const response = await fetch(`${config.apiUrl}/healthcheck`, {
//     //           method : 'GET'
//     //         });
    
//     //         const body = await response.json();
    
//     //         expect(response.ok).toBe(true);
//     //         expect(response.status).toBe(200);
//     //         expect(body.ping).toBe('pong');
//     //         expect(body.timestamp).toBeGreaterThan(0);
//     //         expect(body.database.healthy).toBe(true);
//     //       }, done);
//     //     });
//     //   });
//   });