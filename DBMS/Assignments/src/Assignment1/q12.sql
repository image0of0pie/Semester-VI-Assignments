alter table assignment.emp add NetPay numeric;
update assignment.emp set netpay=(basic*0.5+emp.basic*0.4+emp.basic);