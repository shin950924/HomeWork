import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import {useContext} from 'react/cjs/react.development';
import * as api from '../../api/api';
import AppContext from '../../service/AppContext';

const Issue = () => {
  const {asyncStorageValue, navigation} = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const {height} = Dimensions.get('window');
  const {width} = Dimensions.get('window');
  const [issue, setIssue] = useState([]);
  let per_page = 1;

  useEffect(() => {
    //이슈를 받아옴
    async function getIssue() {
      if (asyncStorageValue && asyncStorageValue != null) {
        //이슈를 저장한다. Rendering을 최소화 하기위해 state가 아닌 let으로 선언된 배열로 선언함.
        let temp = [];
        for (item of asyncStorageValue) {
          const issue = await api.Issue(item.owner.login, item.name);
          console.log('Server');
          if (issue.data && issue.data != null && issue.data.open_issues > 0) {
            //이슈를 가져옴. 모든 이슈를 가져오는 api가 있지만 이는 Client 입장에서는 불필요한 정보를 받게됨.
            //불필요한 정보는 고객의 데이터를 소모하며 앱 실행속도를 지연시킴
            const issueList = await api.IssueList(
              item.owner.login, //유저
              item.name, //Repository 이름
              per_page, //페이지당 아이템 표출 개수
              1, //페이지 Index
            );
            temp.push({
              name: item.name,
              issue_cnt: issue.data.open_issues,
              data: issueList.data,
              isTouchRepository: false,
              page: 1,
            });
          }
        }
        setIssue(temp);
      }
    }
    getIssue();
  }, [asyncStorageValue]);

  const renderItem = (title, index) => {
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: width * 0.05,
            height: height * 0.05,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() =>
              setIssue(
                [...issue],
                (issue[index].isTouchRepository =
                  !issue[index].isTouchRepository),
              )
            }>
            <Text>{title.name}</Text>
          </TouchableOpacity>
          <Text>{`🔥 ${title.issue_cnt}`}</Text>
        </View>
        <View>
          {title.isTouchRepository &&
            title.data.map((item, _) => {
              return (
                <View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('GitWebView', item.html_url);
                      }}>
                      <Text style={{paddingLeft: width * 0.05}}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        if (title.page > 1) {
                          page(item.user.login, index, title.page - 1);
                        } else {
                          alert('첫번째 페이지 입니다.');
                        }
                      }}>
                      <Text style={{fontWeight: '600'}}>{'< '}</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          borderRadius: 75,
                          backgroundColor: 'blue',
                          width: width * 0.05,
                          height: width * 0.05,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: '600',
                          }}>
                          {title.page}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (title.page < title.issue_cnt) {
                          page(item.user.login, index, title.page + 1);
                        } else {
                          alert('마지막 페이지 입니다.');
                        }
                      }}>
                      <Text style={{fontWeight: '600'}}>{' >'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    );
  };

  async function page(owner, repositoryValueIndex, page) {
    console.log(issue[repositoryValueIndex].name);
    const pageInfo = await api.IssueList(
      owner,
      issue[repositoryValueIndex].name,
      per_page,
      page,
    );
    console.log('server');
    console.log(pageInfo);

    let temp = [...issue];

    temp[repositoryValueIndex] = {
      name: issue[repositoryValueIndex].name,
      issue_cnt: issue[repositoryValueIndex].issue_cnt,
      data: pageInfo.data,
      isTouchRepository: true,
      page: page,
    };
    setCurrentPage(page);
    setIssue(temp);
  }
  return (
    <View>
      <FlatList
        data={issue}
        renderItem={({item, index}) => renderItem(item, index)}
        style={{maxHeight: height * 0.3}}
      />
    </View>
  );
};
export default Issue;
