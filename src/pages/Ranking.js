import React, { useEffect, useState } from "react";
import { apiService } from "../services/api.service";
import './page-styles/ranking.css'
import { utils } from "../services/utils";

const Ranking = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUser();
  }, []);
    
  const getAllUser = () => {
    apiService
      .getAll()
      .then((res) => {
          console.log(res?.data?.users);
            setData(res?.data?.users);
      })
      .catch((err) => {
        console.log("api update error", err);
      });
  };

  return (
    <div className="ranking-container container">
      <h1 className="fw-bold primary-color my-5">Classement des joueurs</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">pseudo</th>
            <th scope="col">Point</th>
            <th scope="col">date de creation</th>
          </tr>
        </thead>
        <tbody>
          {data[0] &&
            data.map((user) => {
              return (
                <tr key={user?.id}>
                  <th scope="row">{user?.id}</th>
                  <td>{user?.pseudo}</td>
                  <td>{user?.mark}</td>
                  <td>{ utils.getDate(user?.createdAt) }</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
