const pool = require("../Database/fivethirddb.js");

async function monthlySpendingFifthThird(params) {
  console.log("monthly spending 5/3", params);
  spending = [];

  /*
  const data = await pool.query(
    "select sum(spend) from transactions as t join products as p on t.product_num = p.product_num where p.commodity=$1 and year='2019' and date_part('month', t.purchase_date) =$2",
    [params, 1]
  );
  console.log(data.rows[0].sum);*/

  for (i = 5; i < 9; i++) {
    const data1 = await pool.query(
      "select sum(transaction_amount) from transactions as t join household_demographics as h on t.hshd_num = h.hshd_num where h.income_range = $1 and date_part('month', t.transaction_date) = $2 ",
      [params, i]
    );
    spending.push(data1.rows[0].sum);
  }

  //const data = { precovid: preCovid, postcovid: postCovid };
  console.log(spending);
  return spending;
}

module.exports = { monthlySpendingFifthThird };
