const formatObjValue = (obj) => {
  for (let key in obj) {
    obj[key] = baseFormatPrice(obj[key])
  }
  return obj
};

export const baseFormatPrice = (value) => {
  return (parseInt(value * 1e2, 10) / 1e2).toString()
};

export const getgerensuodeTax = (monthIncome) => {
  if (monthIncome < 0) {
    return {
      taxE2: 0,
      deduct: 0
    }
  }
  else if (monthIncome < 1500) {
    return {
      taxE2: 3,
      deduct: 0,
    }
  } else if (monthIncome <= 4500) {
    return {
      taxE2: 10,
      deduct: 105,
    }
  } else if (monthIncome <= 9000) {
    return {
      taxE2: 20,
      deduct: 555,
    }
  } else if (monthIncome <= 35000) {
    return {
      taxE2: 25,
      deduct: 1005,
    }
  } else if (monthIncome <= 55000) {
    return {
      taxE2: 30,
      deduct: 2755,
    }
  } else if (monthIncome <= 80000) {
    return {
      taxE2: 35,
      deduct: 5055,
    }
  }
  return {
    taxE2: 45,
    deduct: 13505,
  }
};

export const getgerensuodeTax2019 = (monthIncome) => {
  if (monthIncome < 0) {
    return {
      taxE2: 0,
      deduct: 0
    }
  }
  else if (monthIncome <= 3000) {
    return {
      taxE2: 3,
      deduct: 0,
    }
  } else if (monthIncome <= 12000) {
    return {
      taxE2: 10,
      deduct: 210,
    }
  } else if (monthIncome <= 25000) {
    return {
      taxE2: 20,
      deduct: 1410,
    }
  } else if (monthIncome <= 35000) {
    return {
      taxE2: 25,
      deduct: 2660,
    }
  } else if (monthIncome <= 55000) {
    return {
      taxE2: 30,
      deduct: 4410,
    }
  } else if (monthIncome <= 80000) {
    return {
      taxE2: 35,
      deduct: 7160,
    }
  }
  return {
    taxE2: 45,
    deduct: 15160,
  }
};

const calculateTargetValue = (preTax, limit, ...args) => {
  const {min, max} = limit;
  const _preTax = preTax < min ? min : (preTax > max ? max : preTax);
  const obj = {};
  args.forEach((item) => {
    for (let key in item) {
      obj[key] = item[key].c / 1e2 * _preTax;
    }
  });
  return obj;
};

export const getFiveInsuranceOneFund = (preTax, allGene, taxType) => {
  const startTaxPoint = taxType === 1 ? 3500 : 5000;
  let {
    fiveInsuranceLimit,
    housingLimit,
    endowment,
    medical,
    unemployment,
    employmentInjury,
    maternity,
    housing
  } = allGene;

  //五险
  const FIObj = calculateTargetValue(preTax, fiveInsuranceLimit, {endowment}, {medical}, {unemployment}, {employmentInjury}, {maternity});
  const totalFIValue = FIObj.endowment + FIObj.medical + FIObj.unemployment + FIObj.employmentInjury + FIObj.maternity;
  //公积金
  const housingObj = calculateTargetValue(preTax, housingLimit, {housing});

  //应纳税所得额 = 税前收入 - 五险 - 公积金 - 个税起征点
  const yingnashuisuodee = preTax - totalFIValue - housingObj.housing - startTaxPoint;
  //console.log(preTax - totalFIValue - housingObj.housing);
  //个人所得税税率，速算扣除数
  const taxFormula = taxType === 1 ? getgerensuodeTax : getgerensuodeTax2019;
  const {taxE2, deduct} = taxFormula(yingnashuisuodee);
  //个人所得税
  const personalIncomeTax = preTax < startTaxPoint ? 0 : yingnashuisuodee * taxE2 / 1E2 - deduct;
  //税后收入 = 税前收入 - 五险 - 公积金 - 个人所得税
  const afterTax = preTax - totalFIValue - housingObj.housing - personalIncomeTax;
  return formatObjValue({
    ...FIObj,
    ...housingObj,
    personalIncomeTax,
    afterTax
  })
};
