import React, { useState, useContext, useEffect } from "react";
import {
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Header } from "../../../components/Header/Header";
import { colors } from "../../../globals/colors";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../globals/globals";
import ModalDropdown from "react-native-modal-dropdown";
import ArrowDownSVG from "../../../SVGR/Globals/ArrowDown";
import Typography from "../../../components/Typography/Typography";
import AttachmentSVG from "../../../SVGR/Globals/Attachment";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import {
  createProduct,
  dropdownProducts,
  updateProducts,
  singleProduct,
} from "../../../api/Shop";
import { TextInputMask } from "react-native-masked-text";
import AppContext from "../../../appContext/AppContext";
import Autocomplete from "react-native-autocomplete-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { resizeImageHandler } from "../../../utils/ImageResizer";

const MaskedInput = ({
  placeholder,
  mask,
  options,
  small,
  value,

  setAmount,
}) => {
  return (
    <TextInputMask
      placeholderTextColor={colors.dark_blue}
      style={[styles.textinput, small && styles.small]}
      placeholder={placeholder}
      type={mask}
      options={options}
      value={value}
      includeRawValueInChangeText
      onChangeText={(text, rawText) => setAmount(rawText)}
    />
  );
};

const Input = ({
  placeholder,
  multi,
  value,
  handleChange,
  button,
  press,
  image,
  number,
  readonly,
  fundingMedia,
}) => {
  return (
    <>
      {!button ? (
        <TextInput
          editable={!readonly}
          multiline={multi}
          placeholderTextColor={colors.dark_blue}
          style={[styles.textinput, multi && styles.multi]}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => handleChange(text)}
          autoCorrect={false}
          keyboardType={number ? "number-pad" : "default"}
        />
      ) : (
        <TouchableOpacity
          onPress={() => press()}
          style={[
            styles.textinput,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View>
            {!fundingMedia ? (
              <Text style={styles.inputText}>
                {image ? "Image Selected" : placeholder}
              </Text>
            ) : (
              <Text style={styles.inputText}>
                {fundingMedia ? "Video Selected" : placeholder}
              </Text>
            )}
          </View>
          <View>
            <AttachmentSVG />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export const AddProductForm = ({ navigation, route }) => {
  const { editMode, id, data } = route.params;

  const [query, setQuery] = useState("");
  const [filteredQuery, setFilteredQuery] = useState([]);

  const [filteredQuery1, setFilteredQuery1] = useState([]);

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue1, setSelectedValue1] = useState(null);

  const [inputList, setInputList] = useState([0]);
  let sizesOption = [];
  let productTypeOption = [];

  let sizeOptionId = [];
  let productTypeOptionId = [];

  let relatedProductsOption = [];
  let realtedProductsOptitonsId = [];
  const { fixedTitles, related, setRelated } = useContext(AppContext);
  const [relatedState, setRelatedState] = useState(related);
  useEffect(() => {
    fixedTitles.productTypes.map((data) => {
      productTypeOption.push(data.title);
      productTypeOptionId.push(data.id);
      // setRelatedState(productTypeOption);
    });

    // fixedTitles?.sizesTypes.map((data) => {
    //   sizesOption.push(data.title);
    //   sizeOptionId.push(data.id);
    // });
    related.map((data) => {
      relatedProductsOption.push(data.name);
      realtedProductsOptitonsId.push(data.id);
    });
  }, [sizeId, productTypeOption]);

  const getRelatedProductsHandler = () => {
    dropdownProducts(id)
      .then((res) => {
        setRelated(res.data.related);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getRelatedProductsHandler();
  }, []);

  const mediaLibraryAsync = async (media) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(await resizeImageHandler(result.uri));
    }
  };

  // const addProductHandler = () => {
  //   navigation.pop();
  // };

  const inputGenerator = () => {
    setInputList([...inputList, 1]);
  };
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(data?.formatted_image || null);
  const [name, setName] = useState(data?.name || null);
  const [aboutId, setAboutId] = useState(data?.about || null);
  const [sizeId, setSizeId] = useState(data?.size_id || null);
  const [isOffer, setIsOffer] = useState(data?.is_offer || null);
  const [description, setDescription] = useState(data?.description || null);
  const [price, setPrice] = useState(data?.price_per_unit || null);
  const [productId, setProductId] = useState(null);
  const [quanitity, setQuantity] = useState(
    data?.quantity_in_stock.toString() || null
  );
  const [question, setQuestion] = useState(
    editMode ? data.faqs[0]?.question.toString() : null
  );
  const [answer, setAnswer] = useState(
    editMode ? data.faqs[0]?.question.toString() : null
  );
  const [question1, setQuestion1] = useState(
    editMode ? data.faqs[1]?.question.toString() : null
  );
  const [answer1, setAnswer1] = useState(
    editMode ? data.faqs[1]?.answer.toString() : null
  );
  const [question2, setQuestion2] = useState(
    editMode ? data.faqs[2]?.question.toString() : null
  );
  const [answer2, setAnswer2] = useState(
    editMode ? data.faqs[2]?.answer.toString() : null
  );

  const [nameError, setNameError] = useState(null);
  const [productTypeError, setProductTypeError] = useState(null);
  const [sizeError, setSizeError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [quantityError, setQuantityError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [offerError, setOfferError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [aboutError, setAboutError] = useState(null);

  const [faq0ErrorQuestion, setFaq0ErrorQuestion] = useState(null);
  const [faq0ErrorAnswer, setFaq0ErrorAnswer] = useState(null);

  const [selectedValueId, setSelectedValueId] = useState(
    editMode ? data.related_products[0]?.id : null
  );
  const [selectedValueId1, setSelectedValueId1] = useState(
    editMode ? data.related_products[1]?.id : null
  );

  const addProductHandler = () => {
    setLoading(true);
    let fd = new FormData();
    if (name) {
      fd.append("name", name);
    }

    fd.append("product_type_id", editMode ? data.product_type_id : productId);
    fd.append("size_id", sizeId);
    if (description) {
      fd.append("description", description);
    }
    fd.append("price_per_unit", price);
    if (quanitity) {
      fd.append("quantity_in_stock", quanitity);
    }
    if (image) {
      fd.append("image", {
        uri: image,
        name: "Image",
        type: "Image/jpg",
      });
    }
    if (aboutId) {
      fd.append("about", aboutId);
    }

    fd.append("is_offer", editMode ? data.is_offer : isOffer == true ? 1 : 0);

    if (selectedValueId) {
      fd.append(`related_products[0]`, selectedValueId);
    }
    if (selectedValueId1) {
      fd.append(`related_products[1]`, selectedValueId1);
    }
    fd.append(`faq[0][question]`, question);
    fd.append(`faq[0][answer]`, answer);
    if (inputList.length == 2) {
      fd.append(`faq[1][question]`, question1);
      fd.append(`faq[1][answer]`, answer1);
    }
    if (inputList.length > 2) {
      fd.append(`faq[2][question]`, question2);
      fd.append(`faq[2][answer]`, answer2);
    }

    if (!editMode) {
      createProduct(id, fd)
        .then((res) => {
          setLoading(false);

          navigation.pop();
        })
        .catch((err) => {
          setLoading(false);

          setNameError(
            err.response.data?.errors?.name && err.response.data?.errors.name
          );
          setProductTypeError(
            err.response.data.errors?.product_type_id &&
              err.response.data.errors?.product_type_id
          );
          setSizeError(
            err.response.data.errors?.size_id &&
              err.response.data.errors?.size_id
          );
          setDescriptionError(
            err.response.data.errors?.description &&
              err.response.data.errors?.description
          );
          setPriceError(
            err.response.data.errors?.price_per_unit &&
              err.response.data.errors?.price_per_unit
          );
          setOfferError(
            err.response.data.errors?.is_offer &&
              err.response.data.errors?.is_offer
          );
          setQuantityError(
            err.response.data.errors?.quantity_in_stock &&
              err.response.data.errors?.quantity_in_stock
          );
          setImageError(
            err.response.data.errors?.image && err.response.data?.errors?.image
          );
          setAboutError(
            err.response.data.errors?.about && err.response.data.errors?.about
          );
          if (err.response.data.errors["faq.0.question"]) {
            setFaq0ErrorQuestion(err.response.data.errors["faq.0.question"]);
          }
          if (err.response.data.errors["faq.0.question"]) {
            setFaq0ErrorAnswer(err.response.data.errors["faq.0.answer"]);
          }
        });
    } else {
      updateProducts(id, fd, data.id)
        .then((res) => {
          console.log(id, data.id);

          singleProduct(id, data.id).then((res) => {
            navigation.pop();
          });
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const findFilm = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, "i");
      // Setting the filtered film array according the query
      setFilteredQuery(
        relatedState.filter((states) => states.name.search(regex) >= 0)
      );
    } else {
      // If the query is null then return blank
      setFilteredQuery([]);
    }
  };
  const findProducts = (query) => {
    // Method called every time when we change the value of the input
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, "i");
      // Setting the filtered film array according the query
      setFilteredQuery1(
        relatedState.filter((states) => states.name.search(regex) >= 0)
      );
    } else {
      // If the query is null then return blank
      setFilteredQuery([]);
    }
  };

  const closeTab = (name, id) => {
    setSelectedValue(name);
    setSelectedValueId(id);
    setFilteredQuery([]);
  };
  const closeTab1 = (name, id) => {
    setSelectedValue1(name);
    setSelectedValueId1(id);
    setFilteredQuery1([]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <>
        <View
          style={[
            styles.loader,
            { zIndex: loading ? 9 : -1, elevation: loading ? 9 : 0 },
          ]}
        >
          <ActivityIndicator
            size="large"
            color={colors.focused}
            animating={loading}
          />
        </View>

        <SafeAreaView style={styles.container}>
          <Header
            blue
            navigation={navigation}
            title={editMode ? "تعديل المنتج" : "أضف منتج"}
          />
          <ScrollView>
            <>
              <Input
                placeholder="اسم المنتج"
                value={name}
                handleChange={(text) => setName(text)}
              />
              {nameError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography content={nameError} color="red" align="left" />
                </View>
              )}
            </>
            <>
              <ModalDropdown
                options={productTypeOption}
                dropdownStyle={styles.dropdownStyles}
                isFullWidth
                showsVerticalScrollIndicator={false}
                style={[
                  styles.containerStyles,
                  // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                ]}
                textStyle={styles.label}
                defaultValue={editMode ? data.product_type.title : "نوع"}
                onSelect={(item) => {
                  setProductId(productTypeOptionId[item]);
                }}
                renderRowText={(item) => {
                  return (
                    <View>
                      <Typography
                        size={12}
                        content={item}
                        align="right"
                        color={colors.dark_blue}
                      />
                    </View>
                  );
                }}
                renderSeparator={() => <View />}
                renderRowComponent={TouchableOpacity}
                keyboardShouldPersistTaps="handled"
                renderRightComponent={() => {
                  return (
                    <View style={styles.arrowContainer}>
                      <ArrowDownSVG />
                    </View>
                  );
                }}
              />
              {productTypeError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography
                    content={productTypeError}
                    color="red"
                    align="left"
                  />
                </View>
              )}
            </>
            <>
              <ModalDropdown
                options={sizesOption}
                dropdownStyle={styles.dropdownStyles}
                isFullWidth
                showsVerticalScrollIndicator={false}
                style={[
                  styles.containerStyles,
                  // { marginBottom: errorObject.errorVisible ? 0 : 15 },
                ]}
                textStyle={styles.label}
                defaultValue={editMode ? data?.size?.title : "حجم"}
                onSelect={(item) => {
                  setSizeId(sizeOptionId[item]);
                }}
                renderRowText={(item) => {
                  return (
                    <View>
                      <Typography
                        size={12}
                        content={item}
                        align="right"
                        color={colors.dark_blue}
                      />
                    </View>
                  );
                }}
                renderSeparator={() => <View />}
                renderRowComponent={TouchableOpacity}
                keyboardShouldPersistTaps="handled"
                renderRightComponent={() => {
                  return (
                    <View style={styles.arrowContainer}>
                      <ArrowDownSVG />
                    </View>
                  );
                }}
              />
              {sizeError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography content={sizeError} color="red" align="left" />
                </View>
              )}
            </>
            <>
              <Input
                placeholder="مواصفات"
                value={description}
                handleChange={(text) => setDescription(text)}
              />
              {descriptionError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography
                    content={descriptionError}
                    color="red"
                    align="left"
                  />
                </View>
              )}
            </>
            <>
              <MaskedInput
                placeholder={"سعر"}
                value={price}
                mask={"money"}
                options={{
                  precision: 0,
                  separator: ",",
                  delimiter: ",",
                  unit: " LBP ",
                  suffixUnit: "",
                }}
                setAmount={setPrice}
              />
              {priceError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography content={priceError} color="red" align="left" />
                </View>
              )}
            </>
            <>
              <Input
                number
                placeholder="كمية"
                value={quanitity}
                handleChange={(text) => setQuantity(text)}
              />
              {quantityError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography
                    content={quantityError}
                    color="red"
                    align="left"
                  />
                </View>
              )}
            </>
            <>
              <Input
                placeholder="إرفاق الصورة"
                image={image}
                button
                press={() => mediaLibraryAsync()}
              />
              {imageError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography content={imageError} color="red" align="left" />
                </View>
              )}
            </>
            <>
              <Input
                placeholder="حول"
                multi
                value={aboutId}
                handleChange={(text) => setAboutId(text)}
              />
              {aboutError && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography content={aboutError} color="red" align="left" />
                </View>
              )}
            </>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <>
                <View>
                  <Checkbox
                    style={styles.checkbox}
                    value={isOffer}
                    onValueChange={setIsOffer}
                    color={colors.dark_blue}
                  />
                </View>
                <View style={{ marginLeft: 0 }}>
                  <Typography
                    content="اجعل هذا المنتج عرضًا"
                    align="left"
                    color={colors.dark_blue}
                  />
                </View>
              </>
              <></>
            </View>
            {offerError && (
              <View style={{ marginHorizontal: 20 }}>
                <Typography content={offerError} color="red" align="left" />
              </View>
            )}
            <View style={{ paddingBottom: 15 }}>
              <Text style={styles.underline}>التعليمات</Text>
            </View>
            {/* {inputList.map((index) => (
          <InputList
            setAnswer={setAnswer}
            answer={answer}
            question={question}
            setQuestion={setQuestion}
          />
        ))} */}
            <>
              <Input
                value={question}
                handleChange={(text) => setQuestion(text)}
                placeholder="السؤال هنا"
              />
              <>
                {faq0ErrorQuestion && (
                  <View style={{ marginHorizontal: 20 }}>
                    <Typography
                      color={colors.focused}
                      content={faq0ErrorQuestion}
                      align="left"
                    />
                  </View>
                )}
              </>
            </>
            <>
              <Input
                placeholder="الجواب هنا"
                multi
                value={answer}
                handleChange={(text) => setAnswer(text)}
              />
              {setFaq0ErrorAnswer && (
                <View style={{ marginHorizontal: 20 }}>
                  <Typography
                    color={colors.focused}
                    content={faq0ErrorQuestion}
                    align="left"
                  />
                </View>
              )}
            </>
            {inputList.length >= 2 && (
              <>
                <>
                  <Input
                    value={question1}
                    handleChange={(text) => setQuestion1(text)}
                    placeholder="السؤال هنا"
                  />
                </>
                <Input
                  placeholder="الجواب هنا"
                  multi
                  value={answer1}
                  handleChange={(text) => setAnswer1(text)}
                />
              </>
            )}
            {inputList.length > 2 && (
              <>
                <Input
                  value={question2}
                  handleChange={(text) => setQuestion2(text)}
                  placeholder="السؤال هنا"
                />
                <Input
                  placeholder="الجواب هنا"
                  multi
                  value={answer2}
                  handleChange={(text) => setAnswer2(text)}
                />
              </>
            )}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {inputList.length <= 2 && (
                <View style={{ marginLeft: 20, marginRight: 10 }}>
                  <TouchableOpacity
                    onPress={() => inputGenerator()}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {inputList.length <= 2 && (
                <View>
                  <Typography
                    content="أضف سؤال وجواب"
                    align="left"
                    color={colors.dark_blue}
                  />
                </View>
              )}
            </View>
            <View style={{ paddingBottom: 15 }}>
              <Text style={styles.underline}>منتجات متعلقة</Text>
            </View>
            <>
              <View style={styles.autocompleteContainer}>
                <Autocomplete
                  placeholderTextColor={colors.dark_blue}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.textinput}
                  inputContainerStyle={{
                    backgroundColor: "white",
                    borderColor: "white",
                  }}
                  // Data to show in suggestion
                  data={filteredQuery}
                  defaultValue={selectedValue}
                  // Default value if you want to set something in input
                  onChangeText={(text) => findFilm(text)}
                  placeholder={
                    editMode
                      ? data.related_products[0]?.name
                      : "Search for a related product"
                  }
                  flatListProps={{
                    keyExtractor: (item) => item.id,
                    renderItem: ({ item: { name, id } }) => (
                      <TouchableOpacity
                        style={{ paddingHorizontal: 20 }}
                        onPress={() => closeTab(name, id)}
                      >
                        <Text style={styles.itemText}>{name}</Text>
                      </TouchableOpacity>
                    ),
                  }}
                />
              </View>
            </>
            <>
              {!editMode && selectedValue !== null && (
                <View style={styles.autocompleteContainer}>
                  <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textinput}
                    inputContainerStyle={{
                      backgroundColor: "white",
                      borderColor: "white",
                    }}
                    placeholderTextColor={colors.dark_blue}
                    data={filteredQuery1}
                    defaultValue={selectedValue1 || ""}
                    onChangeText={(text) => findProducts(text)}
                    placeholder={
                      editMode
                        ? data.related_products[1]?.name
                        : "Search for a related product"
                    }
                    flatListProps={{
                      keyExtractor: (item) => item.id,
                      renderItem: ({ item: { name, id } }) => (
                        <TouchableOpacity onPress={() => closeTab1(name, id)}>
                          <Text style={styles.itemText}>{name}</Text>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                </View>
              )}
            </>
            <>
              {editMode && (
                <View style={styles.autocompleteContainer}>
                  <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textinput}
                    inputContainerStyle={{
                      backgroundColor: "white",
                      borderColor: "white",
                    }}
                    placeholderTextColor={colors.dark_blue}
                    data={filteredQuery1}
                    defaultValue={selectedValue1 || ""}
                    onChangeText={(text) => findProducts(text)}
                    placeholder={
                      editMode
                        ? data.related_products[1]?.name
                        : "Search for a related product"
                    }
                    flatListProps={{
                      keyExtractor: (item) => item.id,
                      renderItem: ({ item: { name, id } }) => (
                        <TouchableOpacity onPress={() => closeTab1(name, id)}>
                          <Text style={styles.itemText}>{name}</Text>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                </View>
              )}
            </>
            <View>
              <TouchableOpacity
                onPress={() => addProductHandler()}
                style={styles.button}
              >
                <Typography
                  content="إنشاء"
                  align="center"
                  size={16}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textinput: {
    backgroundColor: "#F2F5F6",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
    marginVertical: 7,
  },
  dropdownStyles: {
    backgroundColor: "white",
    height: 100,
    marginTop: 18,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "flex-start",
    padding: 10,
  },
  containerStyles: {
    backgroundColor: "#F2F5F6",
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
    marginVertical: 7,
  },
  label: {
    color: colors.dark_blue,
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    top: 4,
  },
  multi: {
    height: 137,
    textAlignVertical: "top",
  },
  arrowContainer: {
    position: "absolute",
    top: 0,
    alignItems: "flex-end",
    right: 10,

    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.focused,
    textAlign: I18nManager.isRTL ? "right" : "left",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colors.focused,
  },
  inputText: {
    fontFamily: "HelveticaRegular",
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  button: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark_blue,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 3.84,
    alignSelf: "center",
    elevation: 5,
    marginVertical: 20,
  },
  checkbox: {
    margin: SCREEN_HEIGHT * 0.012,
    marginLeft: 12,
    borderRadius: 3,
    height: SCREEN_HEIGHT * 0.022,
    width: SCREEN_HEIGHT * 0.022,
    borderWidth: 1,
  },
  underline: {
    fontFamily: "HelveticaRegular",
    textAlign: "left",
    marginHorizontal: 20,
    color: colors.focused,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  loader: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  autocompleteContainer: {
    // Hack required to make the autocomplete
    // work on Andrdoid
    flex: 1,
    left: 0,
    // position: "absolute",
    right: 0,
    top: 0,
    zIndex: 100000000000,
    padding: 5,
    marginBottom: 10,
  },
});

// function InputList({ answer, setAnswer, question, setQuestion }) {
//   return (
//     <View>
//       <Input
//         value={question}
//         handleChange={(text) => setQuestion(text)}
//         placeholder="السؤال هنا"
//       />
//       <Input
//         placeholder="الجواب هنا"
//         multi
//         value={answer}
//         handleChange={(text) => setAnswer(text)}
//       />
//     </View>
//   );
// }
