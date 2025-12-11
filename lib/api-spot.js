const makeRequest = require("./makeRequest");

module.exports = class XtSpot {
  constructor(accessKey, secretKey) {
    this.request = makeRequest(accessKey, secretKey);
  }

  getServerTime() {
    return this.request("GET", "/v4/public/time");
  }

  getClientIp() {
    return this.request("GET", "/v4/public/client");
  }

  getSymbolTradeInfo({ symbol, symbols, version } = {}) {
    return this.request("GET", "/v4/public/symbol", {
      symbol,
      symbols,
      version,
    });
  }

  getSymbolDepthInfo({ symbol, limit } = {}) {
    return this.request("GET", "/v4/public/depth", { symbol, limit });
  }

  getSymbolKlineInfo({ symbol, interval, startTime, endTime, limit } = {}) {
    return this.request("GET", "/v4/public/kline", {
      symbol,
      interval,
      startTime,
      endTime,
      limit,
    });
  }

  getSymbolTradeRecent({ symbol, limit } = {}) {
    return this.request("GET", "/v4/public/trade/recent", {
      symbol,
      limit,
    });
  }

  getSymbolTradeHistory({ symbol, limit, direction, fromId } = {}) {
    return this.request("GET", "/v4/public/trade/history", {
      symbol,
      limit,
      direction,
      fromId,
    });
  }

  getSymbolTicker({ symbol, symbols, tags } = {}) {
    return this.request("GET", "/v4/public/ticker", {
      symbol,
      symbols,
      tags,
    });
  }

  getSymbolTickerPrice({ symbol, symbols, tags } = {}) {
    return this.request("GET", "/v4/public/ticker/price", {
      symbol,
      symbols,
      tags,
    });
  }

  getSymbolTickerBook({ symbol, symbols, tags } = {}) {
    return this.request("GET", "/v4/public/ticker/book", {
      symbol,
      symbols,
      tags,
    });
  }

  getSymbolTicker24h({ symbol, symbols, tags } = {}) {
    return this.request("GET", "/v4/public/ticker/24h", {
      symbol,
      symbols,
      tags,
    });
  }

  createOrder({
    symbol,
    clientOrderId,
    side,
    type,
    timeInForce,
    bizType,
    price,
    quantity,
    quoteQty
  } = {}) {
    return this.request("POST", "/v4/order", null, {
      symbol,
      clientOrderId,
      side,
      type,
      timeInForce,
      bizType,
      price,
      quantity,
      quoteQty,
    });
  }

  getOrderInfoWithId({ orderId } = {}) {
    return this.request("GET", `/v4/order/${orderId}`);
  }

  getOrderInfo({ orderId, clientOrderId } = {}) {
    return this.request("GET", "/v4/order", {
      orderId,
      clientOrderId,
    });
  }

  getOrdersInfo({ orderIds } = {}) {
    return this.request("GET", "/v4/batch-order", {
      orderIds,
    });
  }

  cancelOrder({ orderId } = {}) {
    return this.request("DELETE", `/v4/order/${orderId}`);
  }

  cancelOrderBatch({ clientBatchId, orderIds } = {}) {
    return this.request("DELETE", "/v4/batch-order", null, {
      clientBatchId,
      orderIds,
    });
  }

  getOpenOrders({ symbol, bizType, side } = {}) {
    return this.request("GET", "/v4/open-order", {
      symbol,
      bizType,
      side,
    });
  }

  cancelOpenOrder({ symbol, bizType, side } = {}) {
    return this.request("DELETE", "/v4/open-order", null, {
      symbol,
      bizType,
      side,
    });
  }

  getHistoryOrders({
    symbol,
    bizType,
    side,
    type,
    state,
    fromId,
    direction,
    limit,
    startTime,
    endTime,
    hiddenCanceled
  } = {}) {
    return this.request("GET", "/v4/history-order", {
      symbol,
      bizType,
      side,
      type,
      state,
      fromId,
      direction,
      limit,
      startTime,
      endTime,
      hiddenCanceled,
    });
  }

  getTrades({
    symbol,
    bizType,
    orderSide,
    orderType,
    orderId,
    fromId,
    direction,
    limit,
    startTime,
    endTime
  } = {}) {
    return this.request("GET", "/v4/trade", {
      symbol,
      bizType,
      orderSide,
      orderType,
      orderId,
      fromId,
      direction,
      limit,
      startTime,
      endTime,
    });
  }

  getCurrencies() {
    return this.request("GET", "/v4/public/currencies");
  }

  getCurrencyBalance({ currency } = {}) {
    return this.request("GET", "/v4/balance", { currency });
  }

  getCurrenciesBalance({ currencies } = {}) {
    return this.request("GET", "/v4/balances", { currencies });
  }

  getSupportCurrencies() {
    return this.request("GET", "/v4/public/wallet/support/currency");
  }

  getDepositAddress({ chain, currency } = {}) {
    return this.request("GET", "/v4/deposit/address", { chain, currency });
  }

  getDepositHistory({
    currency,
    chain,
    status,
    fromId,
    direction,
    limit,
    startTime,
    endTime
  } = {}) {
    return this.request("GET", "/v4/deposit/history", {
      currency,
      chain,
      status,
      fromId,
      direction,
      limit,
      startTime,
      endTime,
    });
  }

  withdraw({ currency, chain, amount, address, memo } = {}) {
    return this.request("POST", "/v4/withdraw", null, {
      currency,
      chain,
      amount,
      address,
      memo,
    });
  }

  withdrawHistory({
    currency,
    chain,
    status,
    fromId,
    direction,
    limit,
    startTime,
    endTime
  } = {}) {
    return this.request("GET", "/v4/withdraw/history", {
      currency,
      chain,
      status,
      fromId,
      direction,
      limit,
      startTime,
      endTime,
    });
  }

  balanceTransfer({ bizId, from, to, currency, symbol, amount } = {}) {
    return this.request("POST", "/v4/balance/transfer", null, {
      bizId,
      from,
      to,
      currency,
      symbol,
      amount,
    });
  }

  balanceAccountTransfer({
    bizId,
    from,
    to,
    currency,
    symbol,
    amount,
    toAccountId,
    fromAccountId
  } = {}) {
    return this.request("POST", "/v4/balance/account/transfer", null, {
      bizId,
      from,
      to,
      currency,
      symbol,
      amount,
      toAccountId,
      fromAccountId,
    });
  }

  getWssListenKey() {
    return this.request("POST", "/v4/ws-token", null, null);
  }
};
