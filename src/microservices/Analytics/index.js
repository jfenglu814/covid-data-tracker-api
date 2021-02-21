const pool = require("../Database/dadb");

async function monthlySpending(params) {
  console.log("monthly spending", params);
  preCovid = [];
  postCovid = [];
  /*
  const data = await pool.query(
    "select sum(spend) from transactions as t join products as p on t.product_num = p.product_num where p.commodity=$1 and year='2019' and date_part('month', t.purchase_date) =$2",
    [params, 1]
  );
  console.log(data.rows[0].sum);*/

  for (i = 1; i < 8; i++) {
    const data1 = await pool.query(
      "select sum(spend) from transactions as t join products as p on t.product_num = p.product_num where p.commodity=$1 and year='2019' and date_part('month', t.purchase_date) =$2",
      [params, i]
    );
    preCovid.push(data1.rows[0].sum);
    const data2 = await pool.query(
      "select sum(spend) from transactions as t join products as p on t.product_num = p.product_num where p.commodity=$1 and year='2020' and date_part('month', t.purchase_date) = $2",
      [params, i]
    );
    postCovid.push(data2.rows[0].sum);
  }

  //const data = { precovid: preCovid, postcovid: postCovid };
  console.log(preCovid, postCovid);
  return { precovid: preCovid, postcovid: postCovid };
}

module.exports = { monthlySpending };
