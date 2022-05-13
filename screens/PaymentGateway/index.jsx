import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../globals/globals";
import axios from "axios";
import { donateFunding } from "../../api/Funding/Funding";
import { colors } from "../../globals/colors";
import { SuccessModal } from "../../components/SuccessModal";

const PaymentGateWay = ({ navigation, route }) => {
  const [session, setSession] = useState(null);
  const [donationId, setDonationId] = useState(null);
  const { formdata, id, endpoint, type } = route.params;
  const [loader, setLoader] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const closeModalHandler = () => {
    setModalVisible(false);
    switch (type) {
      case "donate":
        navigation.navigate("singleFunding");
        break;
      case "appointments":
        navigation.pop();
      default:
        navigation.pop();
    }
  };

  const getSessionId = async () => {
    try {
      const res = await axios.post(
        `http://staging.zowada-backend.hellotree.dev/api/${endpoint}`,
        formdata
      );
      setSession(res.data.session);
      setDonationId(res.data.donation_id);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const webviewRef = React.useRef();
  useEffect(() => {
    getSessionId();
  }, []);

  const getVerifyUrl = () => {
    switch (type) {
      case "donate":
        return `http://staging.zowada-backend.hellotree.dev/api/donation/${donationId}/verify`;
      case "appointments":
        return `http://staging.zowada-backend.hellotree.dev/api/appointments/${id}/verify`;
      default:
        break;
    }
  };

  const responseValidator = async (indicator) => {
    let fd = new FormData();

    fd.append("result_indicator", indicator);
    console.log(fd);
    try {
      const res = await axios.post(getVerifyUrl(), fd);
      switch (type) {
        case "donate":
          setModalVisible(true);
          navigation.navigate("singleFunding");
          break;
        case "appointments":
          setModalVisible(true);
        // navigation.pop();
        default:
          setModalVisible(true);
          navigation.pop();
      }
    } catch (error) {
      console.log(error.response.data);
      alert("Transaction Failed Try again later");
      navigation.pop();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <>
        <View
          style={[
            styles.loader,
            { zIndex: loader ? 9 : 0, elevation: loader ? 9 : 0 },
          ]}
        >
          <ActivityIndicator color={colors.dark_orange} size="large" />
        </View>
        {session == null ? (
          <Text>Loading...</Text>
        ) : (
          <WebView
            onLoad={() => setLoader(false)}
            scalesPageToFit={false}
            ref={webviewRef}
            style={{
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH,
            }}
            source={{
              html: `<html> <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="https://test-bobsal.gateway.mastercard.com/checkout/version/61/checkout.js" data-error="https://staging.zowada-backend.hellotree.dev/payment/error" data-cancel="https://staging.zowada-backend.hellotree.dev/payment/cancel">
    </script>
    <script type="text/javascript">
        Checkout.configure({
            session: {
                id: "${session}"
            },
            interaction: {
                merchant: {
                    logo: "https://www.bankofbeirut.com/misc/BOB_Logo200X100.jpg",
                },
                locale: 'en_US',
                // theme: 'default',
                displayControl: {
                    paymentConfirmation: 'HIDE', //(HIDE - SHOW)
                    billingAddress: 'HIDE', //(OPTIONAL - HIDE - SHOW)
                    customerEmail: 'HIDE', //(HIDE - MANDATORY - OPTIONAL)
                    orderSummary: 'HIDE', //(HIDE - SHOW)
                    shipping: 'HIDE' //(HIDE - SHOW)
                }
            }
        });
        Checkout.showPaymentPage();



    </script>
</head>
<body>
</body>
</html>`,
            }}
            mixedContentMode="compatibility"
            renderLoading
            onNavigationStateChange={({ url }) => {
              var url = url;
              console.log(url);
              var regex = /[?&]([^=#]+)=([^&#]*)/g,
                params = {},
                match;
              while ((match = regex.exec(url))) {
                params[match[1]] = match[2];
              }
              let destoryedUrl = url.split("/");

              switch (destoryedUrl[destoryedUrl.length - 1]) {
                case "cancel":
                  navigation.pop();
                  break;

                default:
                  break;
              }
              console.log(url);
              if (!params.resultIndicator) return;
              responseValidator(params.resultIndicator);
            }}
          />
        )}
      </>
      <SuccessModal visible={modalVisible} close={() => closeModalHandler()} />
    </View>
  );
};

export default PaymentGateWay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignSelf: "center",
    justifyContent: "center",
  },
});
