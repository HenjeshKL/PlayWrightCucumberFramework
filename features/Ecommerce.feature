Feature:  Ecommerce validations
@Regression
Scenario: placing the order
Given login to Ecommerce application with "<username>" and "<password>"
When ADD "<productName>" to cart
Then verify "<productName>" is displayed in a cart
When Enter valid details and Place the order
Then verify order is present in the OrderHistory

Examples:
| username             | password |   productName |
| sachinten@gmail.com  | Iamhero@0000 | ZARA COAT 3 |
| dash@123.com       | Iamhello@12 | ADIDAS ORIGINAL |


   