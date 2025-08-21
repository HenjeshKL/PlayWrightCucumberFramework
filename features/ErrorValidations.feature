Feature:  Ecommerce validations
@Validations
@foo
Scenario: placing the order
Given login to Ecommerce2 application with "<username>" and "<password>"
Then verify error message is displayed

Examples:
| username             | password |
| sachinten@gmail.com  | Iamhero@0000 |
| hello@123.com        | Iamhello@12 |
