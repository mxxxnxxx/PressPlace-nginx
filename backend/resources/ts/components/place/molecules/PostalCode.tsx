import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormContext } from "react-hook-form";

interface PostalCodeProps {
  name: string;
}

const PostalCode: React.FC<PostalCodeProps> = ({
  name
}: PostalCodeProps): React.ReactElement => {


  // hooksのstateを定義
  const [firstCodeCount, setFirstCodeCount] = useState({ count: 0 });
  const [firstCodeValue, setFirstCodeValue] = useState({ value: '' });
  const [lastCodeCount, setLastCodeCount] = useState({ count: 0 });
  const [lastCodeValue, setLastCodeValue] = useState({ value: '' });
  useEffect(() => {
    if (firstCodeCount.count + lastCodeCount.count === 7) {
      postalSearch()
    }
  }, [firstCodeCount, lastCodeCount])

  // 検索を行うメソッド
  const postalSearch = async () => {

    // dbへのurlを定義
    // フォーム上のfirst_codeとlast_codeを取得してurlとして定数を定義
    // /ajax/postal_search?がパスパラメータでそれ以降が検索に使う郵便番号のクエリパラメーター
    let url = '/ajax/postal_search?' + [
      'first_code=' + firstCodeValue.value,
      'last_code=' + lastCodeValue.value
    ].join('&'); // .join('&')でandのクエリーをしている

    let response = await axios.get(url);
    let addressValue = response.data.prefecture + response.data.city + response.data.address;

    // もしNaNでなければ
    if (addressValue) {
      // formに住所を反映
      const elm = document.getElementById('address') as HTMLInputElement;
      // setAddress(addressValue);

      // return elm.value = address;
      return elm.value = addressValue;

    }

  };


  const methods = useFormContext();
  // tsxのhtml部分
  return (
    <>
      <div className="form-group m-0">
        <label htmlFor="first_code" className="control-label">郵便番号</label>
        <input
          name="first_code"
          size={3}
          maxLength={3}
          // 以下でvalueに変化が会った時にイベントが発生する
          // setPostalCodeの引数にpostalCodeのfirstCode: e.target.valueをしていしてjsonに値を入れている
          onKeyUp={(e): void => { setFirstCodeCount({ count: e.currentTarget.value.length }) }}
          onChange={(e): void => { setFirstCodeValue({ value: e.currentTarget.value }) }}
        />
        -
          <input
          name="last_code"
          size={4}
          maxLength={4}
          // 以下でvalueに変化が会った時にイベントが発生する
          onKeyUp={(e): void => { setLastCodeCount({ count: e.currentTarget.value.length }) }}
          onChange={(e): void => { setLastCodeValue({ value: e.currentTarget.value }) }}
        />
      </div>


      <div className="form-group m-0">
        <label htmlFor={name} className="control-label" >住所</label>
        <input
          name={name}
          id={name}
          className="form-control"
          size={20}
          ref={methods.register}
        />
      </div>
    </>
  )
}

export default PostalCode;