import { View, FlatList, ScrollView,BackHandler } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import React, { useState, useEffect } from "react";
import Header from "./Molecules/Header";
import LogoButton from "../../../components/Common/LogoButton";
import images from "../../../assets/images";
import colors from "../../../util/colors";
import RelationPeople from "./Molecules/RelationPeople";
import { getUserRelationships } from "../../../firebase/firestore/relationships";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";
import { Loading } from "../../../components/Common/Loading";
const Relations = ({ navigation,route }) => {
  const relationData=route?.params?.relation;
  const userIdProps=route?.params?.userId;
  const [relationships, setRelationships] = useState(relationData);
  const [relatedUsers, setRelatedUsers] = useState(relationData);
  const [relation, setRelation] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = useSelector(selectUser);
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener(
  //     "focus",
  //     () => {
  //       setLoading(true);
  //       getRelations();
  //       // Return the function to unsubscribe from the event so it gets removed on unmount
  //       return unsubscribe;
  //     },
  //     [navigation]
  //   );
  // });
  // const getRelations = () =>
  //   getUserRelationships(userId)
  //     .then((res) => {
  //       setRelationships(res);
  //       setRelatedUsers(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       alert("Error occured. Please Try again");
  //     })
  //     .finally(() => setLoading(false));

  // useEffect(() => {
  //   if (searchText) {
  //     setRelation(
  //       relationships.filter((otherUser, index) => {
  //         const re = new RegExp(searchText.replace(".", ""));
  //         return !!otherUser.to.firstName.match(re);
  //       })
  //     );
  //   } else {
  //     setRelation(relationships);
  //   }
  // }, [searchText]);
//   useEffect(() => {
//     if(searchText){
//       setRelationships(
//         relatedUsers.filter((otherUser,index)=>{
//         const user = otherUser?.from?.id !== userId ? otherUser?.from : otherUser?.to;
//         const re = new RegExp(searchText.replace('.', ''));
//         return !!user?.firstName?.match(re) || !!user?.lastName?.match(re);
//       })
//       )
//     }else{
//       setRelationships(relatedUsers)
//     }
// }, [searchText]);

useEffect(() => {
  const backAction = () => {
    navigation.navigate('ProfileStack',{screen:'Profile',params:{userId:userIdProps}})
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, []);
  return (
    <ScrollView style={styles.container}>
      <Header onBackPress={()=>navigation.navigate('ProfileStack',{screen:'Profile',params:{userId:userIdProps}})} label="Relationships" />
      {/* <LogoButton
        imgPath={images.search}
        imgStyle={styles.searchIcon}
        container={styles.logoButton}
        label="Search"
        onChangeText={(value) => setSearchText(value)}
      /> */}
      <FlatList
        nestedScrollEnabled={true}
        columnWrapperStyle={{
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
        data={relationships}
        numColumns={4}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={({ item }) => <RelationPeople userId={userId} item={item} />}
      />
    </ScrollView>
  );
};

export default Relations;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "20@s",
  },
  logoButton: {
    paddingHorizontal: "10@s",
    paddingVertical: "4@vs",
    marginBottom: "40@vs",
    borderRadius: "5@ms",
    borderWidth: 0,
    backgroundColor: colors.inputBg,
  },
  searchIcon: {
    width: "20@ms",
    height: "20@ms",
    marginRight: "10@s",
  },
});
