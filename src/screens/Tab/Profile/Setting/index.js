import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SimpleToast from "react-native-simple-toast";
import React, { useState, useEffect } from "react";
import Header from "../Molecules/Header";
import { ScaledSheet, verticalScale } from "react-native-size-matters";
import CustomText from "../../../../components/CustomText";
import InputField from "../../../../components/Common/InputField";
import { changeUserData, getUser } from "../../../../firebase/firestore/users";
import colors from "../../../../util/colors";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { width } from "react-native-dimension";
import { useSelector, useDispatch } from "react-redux";
import { contactList, selectUser } from "../../../../redux/features/userSlice";
import { currentProfileUser } from "../../../../redux/features/profileSlice";
import { Loading } from "../../../../components/Common/Loading";
import CustomButton from "../../../../components/Common/CustomButton";
const Setting = ({ navigation }) => {
  const userId = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isDisabled, setDisabled] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [initialLoading, setInitialLoading] = useState(true);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]);
  const [city, setCity] = useState([
    { label: "Paris", value: "Paris" },
    { label: "Paris1", value: "Paris" },
    { label: "Paris2", value: "Paris" },
  ]);
  const [country, setCountry] = useState([
    { label: "Farnce1", value: "Farnce1" },
    { label: "Farnce2", value: "Farnce2" },
    { label: "Farnce3", value: "Farnce3" },
  ]);
  const [cityopen, setCityOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === "ios");
    setDob(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };
  useEffect(() => {
      getUser(userId)
        .then((user) => {
          setFirstName(user?.firstName);
          setLastName(user?.lastName);
          setEmail(user?.email);
          setGender(user?.gender);
          setDob(user?.dob?.toDate() || new Date());
          setInitialLoading(false);
        })
        .catch((e) => {
          console.log("----error", e);
        });

  }, []);
  const onSubmit = async () => {
    setOnSubmitLoading(true);

    const temp = {
      id: userId,
      firstName,
      lastName,
      gender,
      dob,
    };

    try {
      await changeUserData(temp);
      setOnSubmitLoading(false);
      
      setDisabled(true);
      dispatch(currentProfileUser('update Profile'))
      SimpleToast.show("Profile Updated")
    } catch (e) {
      setOnSubmitLoading(false);
      console.log("eeprofile update",e)
    }
  };
  return initialLoading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <Header label="Settings" />
      <ScrollView
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <CustomText  label="My Account" />

        <InputField
          profile={true}
          value={firstName}
          onChangeText={(newVal) => setFirstName(newVal)}
          autoCapitalize="none"
          label={"First Name"}
          inputStyle={styles.inputStyle}
        />

        <InputField
          profile={true}
          value={lastName}
          onChangeText={(newVal) => setLastName(newVal)}
          autoCapitalize="none"
          label={"Last Name"}
          inputStyle={styles.inputStyle}
        />
         <InputField
          disabled
          profile={true}
          value={email}
          onChangeText={(newVal) => setEmail(newVal)}
          autoCapitalize="none"
          label={"Email"}
          inputStyle={styles.inputStyle}
        />
        <CustomText marginTop={10}  label="Gender" />
        <DropDownPicker
          open={open}
          value={gender}
          items={items}
          setOpen={setOpen}
          setValue={setGender}
          setItems={setItems}
          placeholder="Gender"
          placeholderStyle={{ color: "grey" }}
          dropDownContainerStyle={{
            borderColor: "#dbdbdb",
            width: "96.5%",
          }}
          style={{
            borderColor: "#dbdbdb",
            marginTop: 10,
            height: 45,
            width: "96.5%",
          }}
        />
        <CustomText marginTop={verticalScale(10)} label="Date of birth" />
        <TouchableOpacity
          style={styles.dropDownContainer}
          onPress={showDatePicker}
        >
          <CustomText
            label={dob ? moment(dob).format("YY/MM/DD") : "Date of birth"}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            style={{ width: width(50), alignSelf: "center" }}
            value={dob}
            mode={mode}
            display="default"
            onChange={onStartChange}
          />
        )}
{/* 
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "48%" }}>
            <CustomText textStyle={styles.loginText1} label="City" />
            <DropDownPicker
              open={cityopen}
              value={gender}
              items={city}
              setOpen={setCityOpen}
              setValue={setCityName}
              setItems={setCity}
              placeholder="Paris"
              placeholderStyle={{ color: "grey" }}
              dropDownContainerStyle={{
                borderColor: "#dbdbdb",
                width:"96.5%"
              }}
              style={{
                borderColor: "#dbdbdb",
                marginTop: 10,
                height: 45,
                width: "96.5%",
              }}
            />
          </View>
          <View style={{ width: "48%" }}>
            <CustomText textStyle={styles.loginText1} label="Country" />
            <DropDownPicker
              open={countryOpen}
              value={gender}
              items={country}
              setOpen={setCountryOpen}
              setValue={setCountryName}
              setItems={setCountry}
              placeholder="France"
              placeholderStyle={{ color: "grey" }}
              dropDownContainerStyle={{
                borderColor: "#dbdbdb",
                width:"96.5%"
              }}
              style={{
                borderColor: "#dbdbdb",
                marginTop: 10,
                height: 45,
                width: "96.5%",
              }}
            />
          </View>
        </View> */}
        {/* <CustomText textStyle={styles.loginText1} label="Phone" />
        <InputField
          profile={true}
          value={phone}
          disabled
          onChangeText={(newVal) => setPhone(newVal)}
          autoCapitalize="none"
          label="+33-1995678"
          inputStyle={styles.inputStyle}
        /> */}
        {/* <CustomText textStyle={styles.loginText1} label="Email" /> */}

       
        <CustomButton
            label={"Save Changes"}
            loading={onSubmitLoading}
            btnContainer={styles.saveChangesContainer}
            textStyle={styles.saveChangingText}
            onPress={onSubmit}
            disabled={
              !firstName ||
              !lastName ||
              !gender ||
              !dob
            }
            isSmall
          />
        <CustomText textStyle={styles.loginText1} label="Security" />
        <CustomText textStyle={styles.loginText1} label="Privacy" />
        <CustomText textStyle={styles.loginText1} label="Notifications" />
        <CustomText textStyle={styles.loginText1} label="Help" />
        <CustomText textStyle={styles.loginText1} label="About" />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "20@s",
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  saveChangesContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: "15@s",
    paddingVertical: "2@s",
    borderRadius: "15@s",
    width: "38%",
    alignSelf: "flex-end",
    marginVertical: "10@s",
    alignItems: "center",
    marginHorizontal: "10@s",
    height: "30@s",
  },
  saveChangingText: {
    fontSize: "11@ms",
    color: colors.white,
  },
  loginText: {
    fontSize: "15@ms",
    color: colors.black,
    fontWeight: "500",
  },
  loginText1: {
    fontSize: "16@ms",
    color: colors.black,
    fontWeight: "500",
    marginTop: "10@ms",
  },
  inputStyle: {
    height: "40@s",
    marginVertical: "5@s",
  },
  dropDownContainer: {
    paddingVertical: "10@vs",
    paddingHorizontal: "20@s",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: "10@ms",
    borderWidth: "1@s",
    borderColor: "#dbdbdb",
    width: "96.5%",
    marginTop: "5@s",
  },
});
