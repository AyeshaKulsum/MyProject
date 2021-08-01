const Designationhandler = require('../handlers/designation')
const expect = require('chai').expect;
// const server = require('../server.js')
describe('designation handler', function () {
    before(function () {
        console.log('Before')
        server.register({
            register: require('inject-then'),
            options: {
                message: 'inject-then plugin'
            }
        }, (err) => {
            if (err) {
                console.log('Failed loading inject-then plugin');
            }
        });
        server.start();
    });
    // it('should fetch designation', function (done) {
    //     let request = {
    //         params: {
    //             id: 2
    //         }
    //     }
    //     let response = () => {

    //     }
    //     // Designationhandler.injectThen.fetchDesignationById(request, response).then().catch(err => console.log(err));
    //     const designation = Designation.;
    //     // console.log(des)
    //     //expect(response.statusCode).to.equal(200);
    //     done();
    // });
    after(function () {
        console.log('After')
        server.stop();
    });
});